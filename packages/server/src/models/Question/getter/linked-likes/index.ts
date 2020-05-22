import { error } from '~lib/logger';
import statics from '~models/statics';
import { QuestionError } from '~types/errors';

import type { GetterLinkedLikes } from './types';

export const linkedLikes: GetterLinkedLikes = (
  async function () {
    try {
      const { LikeModelStatic } = statics.models;

      const likeIds = await this.getAll('Like');
      const Likes = await LikeModelStatic.get({ ids: likeIds });

      return Likes;
    } catch (err) {
      error('QuestionModel', 'getLinkedLikes', err);
      throw new QuestionError('get-linked-likes');
    }
  }
);

export type linkedLikes = GetterLinkedLikes;
