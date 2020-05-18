import { error } from '~lib/logger';
import { UserError } from '~types/errors';

import type { UserResolved } from '@shared/models/user';
import type { GetterResolved } from './types';

export const resolved: GetterResolved = (
  async function () {
    try {
      const Events = await this.linkedEvents;
      const eventsResolver = Events.map((Question) => Question.resolved);

      const event: UserResolved = {
        ...this.allProperties(),
        events: await Promise.all(eventsResolver),
      };

      return event;
    } catch (err) {
      error('UserModel', 'resolved', err);
      throw new UserError('resolved');
    }
  }
);

export type resolved = GetterResolved;
