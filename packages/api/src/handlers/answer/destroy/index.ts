import { Actions } from '~store/modules';

import type { Destroy } from './types';

const handler: Destroy = function (context, desAnswerId, desLikeIds) {
  const { question } = context;

  this.store.dispatchAll(
    Actions.Question.removeAnswer(question.id, desAnswerId),
    Actions.Answer.removeAnswer(desAnswerId),

    Actions.Question.removeLikes(question.id, desLikeIds),
    Actions.Like.removeLikes(desLikeIds),
  );
};

export default handler;
export * from './types';
