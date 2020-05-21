import flattenDeep from 'lodash.flattendeep';

import { EventKeys as E } from '@shared/models/event';
import { QuestionKeys as Q } from '@shared/models/question';
import { AnswerKeys as A } from '@shared/models/answer';
import { LikeKeys as L } from '@shared/models/like';

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

    answers: question[Q.answers]?.map(
      (answer) => answer[A.id]
    ) || [],

    likes: flattenDeep(
      question[Q.answers]?.map(
        (answer) => answer[A.likes]?.map(
          (like) => like[L.id]
        ) || []
      ) || [],
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

      answers: question[Q.answers]?.map(
        (answer) => answer[A.id]
      ) || [],

      likes: flattenDeep(
        question[Q.answers]?.map(
          (answer) => answer[A.likes]?.map(
            (like) => like[L.id]
          ) || []
        ) || [],
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

export const addLike: Actions.AddLike = (questionId, likeId) => ({
  type: ActionTypes.ADD_LIKE,
  payload: {
    questionId,
    likeId,
  },
});

export const addLikes: Actions.AddLikes = (questionId, likeIds) => ({
  type: ActionTypes.ADD_LIKES,
  payload: {
    questionId,
    likeIds,
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

export const removeLike: Actions.RemoveLike = (questionId, likeId) => ({
  type: ActionTypes.REMOVE_LIKE,
  payload: {
    questionId,
    likeId,
  },
});

export const removeLikes: Actions.RemoveLikes = (questionId, likeIds) => ({
  type: ActionTypes.REMOVE_LIKES,
  payload: {
    questionId,
    likeIds,
  },
});
