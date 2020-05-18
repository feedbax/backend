import { Actions } from '~store/modules';

import type { Create } from './types';

const handler: Create = function (context, like) {
  const { api } = this.store.getState();
  const { event } = api;
  const { answer, question } = context;

  this.store.dispatchAll(
    Actions.Like.addLike({ event, question, answer }, like),
    Actions.Answer.addLike(answer.id, like.id),
    Actions.Question.addLike(question.id, like.id),
  );
};

export default handler;
export * from './types';
