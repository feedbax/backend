import { Actions } from '~store/modules';
import { ContextKeys as C } from '@shared/packets/context';

import type { Destroy } from './types';

const handler: Destroy = function (context) {
  const {
    [C.questionId]: questionId,
    [C.answerId]: answerId,
  } = context;

  // TODO decrease answer likes
  // TODO decrease question likes
  // TODO hasLiked?

  this.store.dispatchAll(
    // Actions.Answer.removeLike(answerId, likeId),
    // Actions.Question.removeLike(questionId, likeId),
  );
};

export default handler;
export * from './types';
