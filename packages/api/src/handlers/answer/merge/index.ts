import { Actions } from '~store/modules';
import { ContextKeys as C } from '@shared/packets/context';

import type { Merge } from './types';

const handler: Merge = (
  function (context, likeUpdateAnswer, likeUpdateQuestion, desAnswerIds) {
    const {
      [C.questionId]: questionId,
      [C.answerId]: answerId,
    } = context;

    this.store.dispatchAll(
      // Actions.Answer.addLikes(answerId, addedLikeIds),
      // Actions.Question.addLikes(questionId, addedLikeIds),

      // Actions.Question.removeLikes(questionId, desLikeIds),

      // TODO set Answer Likes
      // TODO set Question Likes
      // TODO check hasLiked

      Actions.Answer.removeAnswers(desAnswerIds),
      Actions.Question.removeAnswers(questionId, desAnswerIds),
    );
  }
);

export default handler;
