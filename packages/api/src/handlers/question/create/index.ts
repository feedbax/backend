import { Actions } from '~store/modules';
import { QuestionKeys as Q } from '@shared/models/question';

import type { Create } from './types';

const handler: Create = function (question, answers) {
  const { api } = this.store.getState();
  const { event } = api;

  const { id: eventId } = event;
  const questionId = question[Q.id];

  this.store.dispatchAll(
    Actions.Event.addQuestion(question),
    Actions.Question.addQuestion(eventId, question),
    Actions.Answer.addAnswers(eventId, questionId, answers),
  );
};

export default handler;
export * from './types';
