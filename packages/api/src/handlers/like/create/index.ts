import { Actions } from '~store/modules';
import { ContextKeys as C } from '@shared/packets/context';

import type { Create } from './types';

const handler: Create = function (context) {
  const {
    [C.questionId]: questionId,
    [C.answerId]: answerId,
  } = context;

  this.store.dispatchAll(
    Actions.Answer.increaseLikes(answerId),
    Actions.Answer.setHasLiked(answerId, true),
    Actions.Question.increaseLikes(questionId),
    Actions.Question.setHasLiked(questionId, true),
  );
};

export default handler;
export * from './types';
