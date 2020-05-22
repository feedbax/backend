import { error } from '~lib/logger';
import { AnswerError } from '~types/errors';

import type { GetterLinkedLikesCount } from './types';

export const linkedLikesCount: GetterLinkedLikesCount = (
  async function () {
    try {
      const likeIds = await this.getAll('Like');
      return likeIds.length;
    } catch (err) {
      error('AnswerModel', 'linkedLikesCount', err);
      throw new AnswerError('get-linked-likes-count');
    }
  }
);

export type linkedLikesCount = GetterLinkedLikesCount;
