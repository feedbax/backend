import { Actions } from '~store/modules';
import { ContextKeys } from '@shared/packets/context';
import { LikeKeys } from '@shared/models/like';

import type { Merge } from './types';

const handler: Merge = function (context, addLikes, desLikeIds, desAnswerIds) {
  const { api } = this.store.getState();
  const { event } = api;
  const { id: eventId } = event;

  const {
    [ContextKeys.questionId]: questionId,
    [ContextKeys.answerId]: answerId,
  } = context;

  const addedLikeIds = addLikes.map((like) => like[LikeKeys.id]);

  this.store.dispatchAll(
    Actions.Like.addLikes({ eventId, questionId, answerId }, addLikes),
    Actions.Answer.addLikes(answerId, addedLikeIds),
    Actions.Question.addLikes(questionId, addedLikeIds),

    Actions.Like.removeLikes(desLikeIds),
    Actions.Question.removeLikes(questionId, desLikeIds),

    Actions.Answer.removeAnswers(desAnswerIds),
    Actions.Question.removeAnswers(questionId, desAnswerIds),
  );
};

export default handler;
