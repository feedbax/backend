import statics from '~models/statics';
import { EventError } from '~types/errors';
import { error } from '~lib/logger';

import type { EventModel } from '~models/Event';

import type { ById, ByIds, BySlug } from './types';
import type { Get, Props } from './types';

const bySlug: BySlug = (
  async (slug) => {
    try {
      const { EventModelStatic } = statics.models;

      const Events = await EventModelStatic.findAndLoad<EventModel>({ slug });
      const [Event] = Events;

      if (typeof Event === 'undefined') {
        throw new EventError('get-by-slug-event-undefined');
      }

      return Event;
    } catch (err) {
      error('Event', 'get', 'bySlug', err);
      throw new EventError('get-by-slug');
    }
  }
);

const byIds: ByIds = (
  async (ids) => {
    try {
      const { EventModelStatic } = statics.models;
      const Events = await EventModelStatic.loadMany<EventModel>(ids);

      return Events;
    } catch (err) {
      error('Event', 'get', 'byIds', err);
      throw new EventError('get-by-ids');
    }
  }
);

const byId: ById = (
  async (id) => {
    try {
      const { EventModelStatic } = statics.models;
      const Event = await EventModelStatic.load<EventModel>(id);

      if (typeof Event === 'undefined') {
        throw new EventError('get-by-id');
      }

      return Event;
    } catch (err) {
      error('Event', 'get', 'byId', err);
      throw new EventError('get-by-id');
    }
  }
);

export const get: Get = (
  async (props: Partial<Props>): Promise<any> => {
    const { slug, id, ids } = props;

    if (typeof slug !== 'undefined') {
      return bySlug(slug);
    }

    if (typeof ids !== 'undefined') {
      return byIds(ids);
    }

    if (typeof id !== 'undefined') {
      return byId(id);
    }

    error('Event', 'get', 'noArgument');
    throw new EventError('get-no-argument');
  }
);

export type get = Get;
