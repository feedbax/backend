import { Actions } from '~store/modules';
import { ContextKeys as C } from '@shared/packets/context';

import type { Merge } from './types';

const handler: Merge = (
  function (context, questionLikes, answerLikes, desAnswerIds) {
    const {
      [C.questionId]: questionId,
      [C.answerId]: answerId,
    } = context;

    const { api } = this.store.getState();
    const { answers } = api;

    const destroyedAnswers = Object
      .values(answers)
      .filter(
        (answerState) => (
          desAnswerIds.includes(answerState.id)
        ),
      );

    const hasLikedOne = (
      destroyedAnswers.reduce(
        (prev, answer) => {
          if (prev) return true;
          if (answer.hasLiked) return true;

          return false;
        }, false,
      )
    );

    this.store.dispatchAll(
      Actions.Question.setLikes(questionId, questionLikes),
      Actions.Answer.setLikes(answerId, answerLikes),
      Actions.Answer.setHasLiked(answerId, hasLikedOne),

      Actions.Answer.removeAnswers(desAnswerIds),
      Actions.Question.removeAnswers(questionId, desAnswerIds),
    );
  }
);

export default handler;
