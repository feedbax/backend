import { error } from '~lib/logger';
import { EventError } from '~types/errors';

import type { EventResolved } from '@shared/models/event';
import type { GetterResolved } from './types';

export const resolved: GetterResolved = (
  async function () {
    try {
      const Questions = await this.linkedQuestions;
      const questions = Questions.map((Question) => Question.resolved);

      const event: EventResolved = {
        ...this.allProperties(),
        questions: await Promise.all(questions),
      };

      return event;
    } catch (err) {
      error('EventModel', 'resolved', err);
      throw new EventError('resolved');
    }
  }
);

export type resolved = GetterResolved;
