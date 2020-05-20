import { Actions } from '~store/modules';
import { ContextKeys } from '@shared/packets/context';

import type { Destroy } from './types';

const handler: Destroy = function (context, likeId) {
  const {
    [ContextKeys.questionId]: questionId,
    [ContextKeys.answerId]: answerId,
  } = context;

  this.store.dispatchAll(
    Actions.Like.removeLike(likeId),
    Actions.Answer.removeLike(answerId, likeId),
    Actions.Question.removeLike(questionId, likeId),
  );
};

export default handler;
export * from './types';
