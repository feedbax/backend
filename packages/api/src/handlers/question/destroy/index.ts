import { Actions } from '~store/modules';

import type { Destroy } from './types';

const handler: Destroy = function (desQuestionId, desAnswerIds, desLikeIds) {
  this.store.dispatchAll(
    Actions.Event.removeQuestion(desQuestionId),
    Actions.Question.removeQuestion(desQuestionId),

    Actions.Answer.removeAnswers(desAnswerIds),
    Actions.Like.removeLikes(desLikeIds),
  );
};

export default handler;
export * from './types';
