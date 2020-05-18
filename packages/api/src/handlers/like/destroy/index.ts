import { Actions } from '~store/modules';

import type { Destroy } from './types';

const handler: Destroy = function (context, likeId) {
  const { answer, question } = context;

  this.store.dispatchAll(
    Actions.Like.removeLike(likeId),
    Actions.Answer.removeLike(answer.id, likeId),
    Actions.Question.removeLike(question.id, likeId),
  );
};

export default handler;
export * from './types';
