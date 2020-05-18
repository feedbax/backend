import { error } from '~lib/logger';
import statics from '~models/statics';
import { AnswerError } from '~types/errors';

import type { GetterParent } from './types';

export const parent: GetterParent = (
  async function () {
    try {
      const { QuestionModelStatic } = statics.models;
      const [questionId] = await this.getAll('Question');

      return QuestionModelStatic.get({ id: questionId });
    } catch (err) {
      error('AnswerModel', 'parent', err);
      throw new AnswerError('parent');
    }
  }
);

export type parent = GetterParent;
