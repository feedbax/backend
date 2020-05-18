import { error } from '~lib/logger';
import statics from '~models/statics';
import { LikeError } from '~types/errors';

import type { GetterParent } from './types';

export const parent: GetterParent = (
  async function () {
    try {
      const { AnswerModelStatic } = statics.models;
      const [answerId] = await this.getAll('Answer');

      return AnswerModelStatic.get({ id: answerId });
    } catch (err) {
      error('LikeModel', 'parent', err);
      throw new LikeError('parent');
    }
  }
);

export type parent = GetterParent;
