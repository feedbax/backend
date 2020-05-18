import { QuestionError } from '~types/errors';
import { error } from '~lib/logger';

import type { GetterResolved } from './types';

export const resolved: GetterResolved = (
  async function () {
    try {
      const Answers = await this.linkedAnswers;

      const answersPromise = Answers.map((Answer) => Answer.resolved);
      const answers = await Promise.all(answersPromise);

      return {
        ...this.allProperties(),
        answers,
      };
    } catch (err) {
      error('QuestionModel', 'resolved', err);
      throw new QuestionError('resolved');
    }
  }
);

export type resolved = GetterResolved;
