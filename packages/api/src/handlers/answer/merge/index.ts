import { Actions } from '~store/modules';

import type { Merge } from './types';

const handler: Merge = function (context, addLikes, desLikeIds, desAnswerIds) {
  const { api } = this.store.getState();
  const { event } = api;
  const { question, answer } = context;

  const addedLikeIds = addLikes.map((_l) => _l.id);

  this.store.dispatchAll(
    Actions.Like.addLikes({ event, question, answer }, addLikes),
    Actions.Answer.addLikes(answer.id, addedLikeIds),
    Actions.Question.addLikes(question.id, addedLikeIds),

    Actions.Like.removeLikes(desLikeIds),
    Actions.Question.removeLikes(question.id, desLikeIds),

    Actions.Answer.removeAnswers(desAnswerIds),
    Actions.Question.removeAnswers(question.id, desAnswerIds),
  );
};

export default handler;
