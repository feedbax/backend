import { error } from '~lib/logger';
import { QuestionError } from '~types/errors';

import type { GetterLinkedLikesCount } from './types';

export const linkedLikesCount: GetterLinkedLikesCount = (
  async function () {
    try {
      const likeIds = await this.getAll('Like');
      return likeIds.length;
    } catch (err) {
      error('QuestionModel', 'getLinkedLikes', err);
      throw new QuestionError('get-linked-likes');
    }
  }
);

export type linkedLikesCount = GetterLinkedLikesCount;
