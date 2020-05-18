import statics from '~models/statics';
import { error } from '~lib/logger';

import { AnswerError } from '~types/errors';

import type { LikeModel } from '~models/Like';
import type { IsLikedBy } from './types';

export const isLikedBy: IsLikedBy = (
  async (answer, author) => {
    try {
      const { LikeModelStatic } = statics.models;

      const idsAnswer: string[] = await answer.getAll('Like');
      const idsAuthor: string[] = await LikeModelStatic.find({ author });

      const idsIntersect = idsAnswer.filter((id) => idsAuthor.includes(id));
      const [likeId] = idsIntersect;

      if (likeId) {
        const like = await LikeModelStatic.load<LikeModel>(likeId);
        return [true, like];
      }

      return [false, undefined];
    } catch (err) {
      error('Answer', 'isLikedBy', err);
      throw new AnswerError('is-liked-by');
    }
  }
);

export type isLikedBy = IsLikedBy;
