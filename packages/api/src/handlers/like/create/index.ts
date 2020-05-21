import { Actions } from '~store/modules';
import { ContextKeys as C } from '@shared/packets/context';

import type { Create } from './types';

const handler: Create = function (context) {
  const {
    [C.questionId]: questionId,
    [C.answerId]: answerId,
  } = context;

  // TODO increase answer likes
  // TODO increase question likes
  // TODO hasLiked?

  this.store.dispatchAll(
    // Actions.Answer.addLike(answerId),
    // Actions.Question.addLike(questionId),
  );
};

export default handler;
export * from './types';
