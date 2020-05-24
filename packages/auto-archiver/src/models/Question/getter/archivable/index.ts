import { QuestionError } from '~types/errors';
import { error } from '~lib/logger';

import type { GetterArchivable } from './types';

export const archivable: GetterArchivable = (
  async function () {
    try {
      const Answers = await this.linkedAnswers;

      const answersPromise = Answers.map((Answer) => Answer.archivable);
      const answers = await Promise.all(answersPromise);

      return {
        ...this.allProperties(),
        answers,
      };
    } catch (err) {
      error('QuestionModel', 'archivable', err);
      throw new QuestionError('archivable');
    }
  }
);

export type archivable = GetterArchivable;
