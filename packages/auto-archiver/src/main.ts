import 'core-js/stable';
import '~models/register';

import { Nohm } from 'nohm';
import redis from 'redis';
import { MongoClient } from 'mongodb';

import { debug, error } from '~lib/logger';
import statics from '~models/statics';

import type { EventModel } from '~models/Event';
import type { Collection } from 'mongodb';
import type { EventArchivable } from '@shared/models/event';

const clientRedis = redis.createClient(process.env.REDIS_URL || '');

const getArchiveEventCollection = (
  async (): Promise<Collection<EventArchivable>> => {
    const $clientMongo = MongoClient.connect(
      process.env.MONGO_URL || 'mongodb://root:example@localhost:27017',
      { useUnifiedTopology: true },
    );

    const mongoClient = await $clientMongo;
    const archiveDB = mongoClient.db('feedbax-archive');
    const archiveEventCollection = archiveDB.collection<EventArchivable>('events');

    return archiveEventCollection;
  }
);

clientRedis.once('ready', async () => {
  const collection = await getArchiveEventCollection();

  Nohm.setClient(clientRedis);
  Nohm.setPrefix('feedbax-dev');

  const TEN_MINUTES = 0.1 * 60 * 1000;

  const archive = (
    async (event: EventModel): Promise<void> => {
      debug('trying to store', event.id, 'in mongodb..');

      const { EventModelStatic } = statics.models;
      const eventArchivable = await event.archivable;

      await collection.insertOne(eventArchivable);

      debug('successfully stored', event.id, 'in mongodb');
      debug('trying to delete', event.id, 'from redis..');

      await EventModelStatic.destroy({ eventId: event.id });
      debug('successfully deleted', event.id, 'from redis');
    }
  );

  const check = (
    async (): Promise<void> => {
      try {
        const { EventModelStatic } = statics.models;
        const dateNow = Date.now() / 1000;
        const events = await EventModelStatic.findAndLoad<EventModel>({});

        const archivePromises = [];

        for (let i = 0; i < events.length; i += 1) {
          const event = events[i];
          const eventEndTime = event.property('endTime');
          const eventExpired = dateNow >= eventEndTime;

          debug(event.id, 'eventExpired?', eventExpired);

          if (eventExpired) {
            archivePromises.push(
              archive(event),
            );
          }
        }

        await Promise.all(archivePromises);
      } catch (err) {
        error('archiving failed', err);
      }
    }
  );

  setInterval(check, TEN_MINUTES);
});
