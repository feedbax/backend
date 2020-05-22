import statics from '~models/statics';
import { error } from '~lib/logger';
import { AnswerError } from '~types/errors';

import type { IsLikedBy } from './types';

export const isLikedBy: IsLikedBy = (
  async (question, author) => {
    try {
      const { LikeModelStatic } = statics.models;

      const idsAnswer: string[] = await question.getAll('Like');
      const idsAuthor: string[] = await LikeModelStatic.find({ author });

      const idsIntersect = idsAnswer.filter((id) => idsAuthor.includes(id));
      const hasLiked = idsIntersect.length >= 1;

      if (hasLiked) {
        const likes = await LikeModelStatic.get({ ids: idsIntersect });
        return [true, likes];
      }

      return [false, undefined];
    } catch (err) {
      error('Answer', 'isLikedBy', err);
      throw new AnswerError('is-liked-by');
    }
  }
);

export type isLikedBy = IsLikedBy;
