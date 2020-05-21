import { Actions } from '~store/modules';
import { ContextKeys as C } from '@shared/packets/context';

import type { Destroy } from './types';

const handler: Destroy = function (context, likeUpdateQuestion, desAnswerId) {
  const { [C.questionId]: questionId } = context;

  this.store.dispatchAll(
    Actions.Question.removeAnswer(questionId, desAnswerId),
    Actions.Answer.removeAnswer(desAnswerId),

    // TODO: set question likes
    // Actions.Question.removeLikes(questionId, desLikeIds),
  );
};

export default handler;
export * from './types';
