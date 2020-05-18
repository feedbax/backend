import { error } from '~lib/logger';
import { EventError } from '~types/errors';
import statics from '~models/statics';

import type { GetterLinkedQuestions } from './types';

export const linkedQuestions: GetterLinkedQuestions = (
  async function () {
    try {
      const { QuestionModelStatic } = statics.models;

      const questionIds = await this.getAll('Question');
      const Questions = await QuestionModelStatic.get({ ids: questionIds });

      return Questions;
    } catch (err) {
      error('EventModel', 'getLinkedQuestions', err);
      throw new EventError('get-linked-questions');
    }
  }
);

export type linkedQuestions = GetterLinkedQuestions;
