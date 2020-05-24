import { error } from '~lib/logger';
import statics from '~models/statics';
import { QuestionError } from '~types/errors';

import type { GetterLinkedAnswers } from './types';

export const linkedAnswers: GetterLinkedAnswers = (
  async function () {
    try {
      const { AnswerModelStatic } = statics.models;

      const answerIds = await this.getAll('Answer');
      const Answers = await AnswerModelStatic.get({ ids: answerIds });

      return Answers;
    } catch (err) {
      error('QuestionModel', 'getLinkedAnswers', err);
      throw new QuestionError('get-linked-answers');
    }
  }
);

export type linkedAnswers = GetterLinkedAnswers;
