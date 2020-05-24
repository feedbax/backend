import { error } from '~lib/logger';
import statics from '~models/statics';
import { AnswerError } from '~types/errors';

import type { GetterLinkedLikes } from './types';

export const linkedLikes: GetterLinkedLikes = (
  async function () {
    try {
      const { LikeModelStatic } = statics.models;

      const likeIds = await this.getAll('Like');
      const likes = await LikeModelStatic.get({ ids: likeIds });

      return likes;
    } catch (err) {
      error('AnswerModel', 'linkedLikes', err);
      throw new AnswerError('get-linked-likes');
    }
  }
);

export type linkedLikes = GetterLinkedLikes;
