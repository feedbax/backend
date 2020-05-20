import { error } from '~lib/logger';
import { UserError } from '~types/errors';

import { UserResolved, UserKeys } from '@shared/models/user';
import type { GetterResolved } from './types';

export const resolved: GetterResolved = (
  async function () {
    try {
      const Events = await this.linkedEvents;
      const eventsResolver = Events.map((Question) => Question.resolved);
      const props = this.allProperties();

      const event: UserResolved = {
        [UserKeys.id]: props.id,
        [UserKeys.email]: props.email,
        [UserKeys.events]: await Promise.all(eventsResolver),
      };

      return event;
    } catch (err) {
      error('UserModel', 'resolved', err);
      throw new UserError('resolved');
    }
  }
);

export type resolved = GetterResolved;
