import { error } from '~lib/logger';
import statics from '~models/statics';
import { UserError } from '~types/errors';

import type { GetterLinkedEvents } from './types';

export const linkedEvents: GetterLinkedEvents = (
  async function () {
    try {
      const { EventModelStatic } = statics.models;

      const eventIds = await this.getAll('Event');
      const Events = await EventModelStatic.get({ ids: eventIds });

      return Events;
    } catch (err) {
      error('UserModel', 'getLinkedEvents', err);
      throw new UserError('get-linked-events');
    }
  }
);

export type linkedEvents = GetterLinkedEvents;
