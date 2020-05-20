import { Actions } from '~store/modules';

import type { Create } from './types';
import { QuestionKeys } from '@shared/models/question';

const handler: Create = function (question, answers) {
  const { api } = this.store.getState();
  const { event } = api;

  const { id: eventId } = event;
  const questionId = question[QuestionKeys.id];

  this.store.dispatchAll(
    Actions.Event.addQuestion(question),
    Actions.Question.addQuestion(eventId, question),
    Actions.Answer.addAnswers(eventId, questionId, answers),
  );
};

export default handler;
export * from './types';
