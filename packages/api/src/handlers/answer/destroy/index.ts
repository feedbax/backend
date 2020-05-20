import { Actions } from '~store/modules';
import { ContextKeys } from '@shared/packets/context';

import type { Destroy } from './types';

const handler: Destroy = function (context, desAnswerId, desLikeIds) {
  const { [ContextKeys.questionId]: questionId } = context;

  this.store.dispatchAll(
    Actions.Question.removeAnswer(questionId, desAnswerId),
    Actions.Answer.removeAnswer(desAnswerId),

    Actions.Question.removeLikes(questionId, desLikeIds),
    Actions.Like.removeLikes(desLikeIds),
  );
};

export default handler;
export * from './types';
