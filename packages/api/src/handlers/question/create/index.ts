import { Actions } from '~store/modules';

import type { Create } from './types';

const handler: Create = function (question, answers) {
  const { api } = this.store.getState();
  const { event } = api;

  this.store.dispatchAll(
    Actions.Event.addQuestion(question),
    Actions.Question.addQuestion(event.id, question),
    Actions.Answer.addAnswers(event.id, question.id, answers),
  );
};

export default handler;
export * from './types';
