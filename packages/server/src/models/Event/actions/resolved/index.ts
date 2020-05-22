import { error } from '~lib/logger';
import { EventError } from '~types/errors';

import { EventResolved, EventKeys } from '@shared/models/event';
import type { GetterResolved } from './types';

export const resolved: GetterResolved = (
  async function (event, userUUID) {
    try {
      const props = event.allProperties();

      const Questions = await event.linkedQuestions;
      const questions = Questions.map((Question) => Question.resolved(userUUID));

      const eventResolved: EventResolved = {
        [EventKeys.id]: props.id,
        [EventKeys.slug]: props.slug,
        [EventKeys.settings]: props.settings,
        [EventKeys.questions]: await Promise.all(questions),
      };

      return eventResolved;
    } catch (err) {
      error('EventModel', 'resolved', err);
      throw new EventError('resolved');
    }
  }
);

export type resolved = GetterResolved;
