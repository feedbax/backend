import { Actions } from '~store/modules';
import { ContextKeys as C } from '@shared/packets/context';
import { AnswerKeys as A } from '@shared/models/answer';

import type { AnswerResolved } from '@shared/models/answer';
import type { Create } from './types';

const handler: Create = function (context, answer) {
  const { api } = this.store.getState();
  const { event } = api;

  const { id: eventId } = event;
  const { [C.questionId]: questionId } = context;
  const answerId = answer[A.id];

  const addedAnswer: AnswerResolved = {
    ...answer,
    [A.likes]: 0,
  };

  this.store.dispatchAll(
    Actions.Answer.addAnswer(eventId, questionId, addedAnswer),
    Actions.Question.addAnswer(questionId, answerId),
  );
};

export default handler;
export * from './types';
