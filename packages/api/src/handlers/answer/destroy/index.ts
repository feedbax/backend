import { Actions } from '~store/modules';
import { ContextKeys as C } from '@shared/packets/context';

import type { Destroy } from './types';

const handler: Destroy = function (context, questionLikes, desAnswerId) {
  const { [C.questionId]: questionId } = context;

  this.store.dispatchAll(
    Actions.Question.removeAnswer(questionId, desAnswerId),
    Actions.Answer.removeAnswer(desAnswerId),
    Actions.Question.setLikes(questionId, questionLikes),
  );
};

export default handler;
export * from './types';
