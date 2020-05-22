import { EventKeys as E } from '@shared/models/event';
import { QuestionKeys as Q } from '@shared/models/question';
import { AnswerKeys as A } from '@shared/models/answer';

import * as ActionTypes from '~store/modules/questions/types';
import * as Actions from './types';

export const addQuestion: Actions.AddQuestion = (eventId, question) => ({
  type: ActionTypes.ADD_QUESTION,

  payload: {
    eventId,

    id: question[Q.id],
    order: question[Q.order],
    settings: question[Q.settings],
    text: question[Q.text],
    type: question[Q.type],
    likes: question[Q.likes],
    hasLiked: question[Q.hasLiked],

    answers: question[Q.answers]?.map(
      (answer) => answer[A.id]
    ) || [],
  },
});

export const addQuestionsByEvent: Actions.AddQuestionsByEvent = (event) => ({
  type: ActionTypes.ADD_QUESTIONS,

  payload: event[E.questions]?.map(
    (question) => ({
      eventId: event[E.id],

      id: question[Q.id],
      order: question[Q.order],
      settings: question[Q.settings],
      text: question[Q.text],
      type: question[Q.type],
      likes: question[Q.likes],
      hasLiked: question[Q.hasLiked],

      answers: question[Q.answers]?.map(
        (answer) => answer[A.id]
      ) || [],
    })
  ),
});

export const addAnswer: Actions.AddAnswer = (questionId, answerId) => ({
  type: ActionTypes.ADD_ANSWER,
  payload: {
    questionId,
    answerId,
  },
});

export const increaseLikes: Actions.IncreaseLikes = (questionId) => ({
  type: ActionTypes.INCREASE_LIKES,
  payload: {
    questionId,
  },
});

export const increaseLikesBy: Actions.IncreaseLikesBy = (questionId, likesCount) => ({
  type: ActionTypes.INCREASE_LIKES_BY,
  payload: {
    questionId,
    likesCount,
  },
});

export const removeQuestion: Actions.RemoveQuestion = (questionId) => ({
  type: ActionTypes.REMOVE_QUESTION,
  payload: questionId,
});

export const removeQuestions: Actions.RemoveQuestions = (questionIds) => ({
  type: ActionTypes.REMOVE_QUESTIONS,
  payload: questionIds,
});

export const removeAnswer: Actions.RemoveAnswer = (questionId, answerId) => ({
  type: ActionTypes.REMOVE_ANSWER,
  payload: {
    questionId,
    answerId,
  },
});

export const removeAnswers: Actions.RemoveAnswers = (questionId, answerIds) => ({
  type: ActionTypes.REMOVE_ANSWERS,
  payload: {
    questionId,
    answerIds,
  },
});

export const decreaseLikes: Actions.DecreaseLikes = (questionId) => ({
  type: ActionTypes.DECREASE_LIKES,
  payload: {
    questionId,
  },
});

export const decreaseLikesBy: Actions.DecreaseLikesBy = (questionId, likesCount) => ({
  type: ActionTypes.DECREASE_LIKES_BY,
  payload: {
    questionId,
    likesCount,
  },
});

export const setHasLiked: Actions.SetHasLiked = (
  (questionId, hasLiked) => ({
    type: ActionTypes.SET_HAS_LIKED,
    payload: {
      questionId,
      hasLiked,
    },
  })
);

export const setLikes: Actions.SetLikes = (
  (questionId, likes) => ({
    type: ActionTypes.SET_LIKES,
    payload: {
      questionId,
      likes,
    },
  })
);
