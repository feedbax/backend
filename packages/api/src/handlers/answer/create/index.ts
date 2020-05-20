import { Actions } from '~store/modules';
import { ContextKeys } from '@shared/packets/context';
import { AnswerKeys } from '@shared/models/answer';

import type { Create } from './types';

const handler: Create = function (context, answer) {
  const { api } = this.store.getState();
  const { event } = api;

  const { id: eventId } = event;
  const { [ContextKeys.questionId]: questionId } = context;
  const answerId = answer[AnswerKeys.id];

  const addedAnswer = {
    ...answer,
    [AnswerKeys.likes]: [],
  };

  this.store.dispatchAll(
    Actions.Answer.addAnswer(eventId, questionId, addedAnswer),
    Actions.Question.addAnswer(questionId, answerId),
  );
};

export default handler;
export * from './types';
