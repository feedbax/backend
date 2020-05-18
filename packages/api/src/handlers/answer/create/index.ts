import { Actions } from '~store/modules';

import type { Create } from './types';

const handler: Create = function (context, answer) {
  const { api } = this.store.getState();
  const { event } = api;
  const { question } = context;

  this.store.dispatchAll(
    Actions.Answer.addAnswer(event.id, question.id, { ...answer, likes: [] }),
    Actions.Question.addAnswer(question.id, answer.id),
  );
};

export default handler;
export * from './types';
