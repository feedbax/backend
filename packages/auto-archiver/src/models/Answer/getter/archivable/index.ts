import { error } from '~lib/logger';
import { AnswerError } from '~types/errors';

import type { GetterArchivable } from './types';

export const archivable: GetterArchivable = (
  async function () {
    try {
      const Likes = await this.linkedLikes;
      const likes = Likes.map((Like) => Like.archivable);

      return {
        ...this.allProperties(),
        likes: await Promise.all(likes),
      };
    } catch (err) {
      error('AnswerModel', 'archivable', err);
      throw new AnswerError('archivable');
    }
  }
);

export type archivable = GetterArchivable;
