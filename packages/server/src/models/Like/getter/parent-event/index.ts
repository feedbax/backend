import { error } from '~lib/logger';
import statics from '~models/statics';
import { LikeError } from '~types/errors';

import type { GetterParentEvent } from './types';

export const parentEvent: GetterParentEvent = (
  async function () {
    try {
      const { EventModelStatic } = statics.models;
      const [eventId] = await this.getAll('Event');

      return EventModelStatic.get({ id: eventId });
    } catch (err) {
      error('LikeModel', 'parentEvent', err);
      throw new LikeError('parent-event');
    }
  }
);

export type parentEvent = GetterParentEvent;
