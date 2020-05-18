import { Nohm } from 'nohm';
import { defaultSettings } from '@shared/models/event';

import { error } from '~lib/logger';
import statics from '~models/statics';
import { EventError } from '~types/errors';

import type { EventModel } from '~models/Event';
import type { Create, Props } from './types';
import type { WithUser, EventExists } from './types';

const withUser: WithUser = (
  async (user, props) => {
    try {
      const Event = await Nohm.factory<EventModel>('Event');

      Event.property({
        ...props,

        settings: {
          ...defaultSettings,
          ...props.settings,
        },
      });

      Event.link(user);
      user.link(Event);

      await user.save();

      return Event;
    } catch (err) {
      error('Event', 'create', 'withUser', err);
      throw new EventError('create-with-user');
    }
  }
);

const checkEventExists: EventExists = (
  async (props) => {
    const { EventModelStatic } = statics.models;

    try {
      await EventModelStatic.get({ slug: props.slug });
      return true;
    } catch {
      return false;
    }
  }
);

export const create: Create = (
  async (props, data: Partial<Props>): Promise<any> => {
    const { user } = data;

    const eventExists = await checkEventExists(props);

    if (eventExists) {
      throw new EventError('create-slug-exists');
    }

    if (typeof user !== 'undefined') {
      return withUser(user, props);
    }

    error('Event', 'create', 'noArgument');
    throw new EventError('create-no-argument');
  }
);

export type create = Create;
