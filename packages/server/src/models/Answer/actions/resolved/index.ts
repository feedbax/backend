import { error } from '~lib/logger';
import { AnswerError } from '~types/errors';

import type { GetterResolved } from './types';
import { AnswerKeys } from '@shared/models/answer';

export const resolved: GetterResolved = (
  async function (answer, userUUID) {
    try {
      const props = answer.allProperties();

      const likesCount = await answer.linkedLikesCount;
      const [hasLiked] = await answer.isLikedBy(userUUID);
      const isAuthor = props.author === userUUID;

      return {
        [AnswerKeys.id]: props.id,
        [AnswerKeys.text]: props.text,
        [AnswerKeys.time]: props.time,
        [AnswerKeys.likes]: likesCount,
        [AnswerKeys.isMine]: isAuthor,
        [AnswerKeys.hasLiked]: hasLiked,
      };
    } catch (err) {
      error('AnswerModel', 'resolved', err);
      throw new AnswerError('resolved');
    }
  }
);

export type resolved = GetterResolved;
