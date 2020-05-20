import { Actions } from '~store/modules';
import { ContextKeys } from '@shared/packets/context';
import { LikeKeys } from '@shared/models/like';

import type { Create } from './types';

const handler: Create = function (context, like) {
  const { api } = this.store.getState();
  const { event } = api;
  const { id: eventId } = event;

  const {
    [ContextKeys.questionId]: questionId,
    [ContextKeys.answerId]: answerId,
  } = context;

  const likeId = like[LikeKeys.id];

  this.store.dispatchAll(
    Actions.Like.addLike({ eventId, questionId, answerId }, like),
    Actions.Answer.addLike(answerId, likeId),
    Actions.Question.addLike(questionId, likeId),
  );
};

export default handler;
export * from './types';
