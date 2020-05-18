import { error } from '~lib/logger';
import { AnswerError } from '~types/errors';

import type { GetterResolved } from './types';

export const resolved: GetterResolved = (
  async function () {
    try {
      const Likes = await this.linkedLikes;
      const likes = Likes.map((Like) => Like.resolved);

      return {
        ...this.allProperties(),
        likes: await Promise.all(likes),
      };
    } catch (err) {
      error('AnswerModel', 'resolved', err);
      throw new AnswerError('resolved');
    }
  }
);

export type resolved = GetterResolved;
