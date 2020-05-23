import { Actions } from '~store/modules';
import { ContextKeys as C } from '@shared/packets/context';

import type { Destroy } from './types';

const handler: Destroy = function (context) {
  const {
    [C.questionId]: questionId,
    [C.answerId]: answerId,
  } = context;

  const { api } = this.store.getState();
  const { questions, answers } = api;

  const { [questionId]: question } = questions;
  const questionAnswersIds = question.answers;

  const likedQuestionAnswers = (
    Object
      .values(answers)
      .filter(
        (answerState) => (
          questionAnswersIds.includes(answerState.id)
          && answerState.hasLiked
        ),
      )
  );

  const keepHasQuestionLiked = likedQuestionAnswers.length >= 2;

  this.store.dispatchAll(
    Actions.Answer.decreaseLikes(answerId),
    Actions.Answer.setHasLiked(answerId, false),
    Actions.Question.decreaseLikes(questionId),
    Actions.Question.setHasLiked(questionId, keepHasQuestionLiked),
  );
};

export default handler;
export * from './types';
