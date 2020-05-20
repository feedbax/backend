import flattenDeep from 'lodash.flattendeep';

import { EventKeys } from '@shared/models/event';
import { QuestionKeys } from '@shared/models/question';
import { AnswerKeys } from '@shared/models/answer';
import { LikeKeys } from '@shared/models/like';

import * as ActionTypes from '~store/modules/questions/types';
import * as Actions from './types';

export const addQuestion: Actions.AddQuestion = (eventId, question) => ({
  type: ActionTypes.ADD_QUESTION,

  payload: {
    eventId,

    id: question[QuestionKeys.id],
    order: question[QuestionKeys.order],
    settings: question[QuestionKeys.settings],
    text: question[QuestionKeys.text],
    type: question[QuestionKeys.type],

    answers: question[QuestionKeys.answers]?.map(
      (answer) => answer[AnswerKeys.id]
    ) || [],

    likes: flattenDeep(
      question[QuestionKeys.answers]?.map(
        (answer) => answer[AnswerKeys.likes]?.map(
          (like) => like[LikeKeys.id]
        ) || []
      ) || [],
    ) || [],
  },
});

export const addQuestionsByEvent: Actions.AddQuestionsByEvent = (event) => ({
  type: ActionTypes.ADD_QUESTIONS,

  payload: event[EventKeys.questions]?.map(
    (question) => ({
      eventId: event[EventKeys.id],

      id: question[QuestionKeys.id],
      order: question[QuestionKeys.order],
      settings: question[QuestionKeys.settings],
      text: question[QuestionKeys.text],
      type: question[QuestionKeys.type],

      answers: question[QuestionKeys.answers]?.map(
        (answer) => answer[AnswerKeys.id]
      ) || [],

      likes: flattenDeep(
        question[QuestionKeys.answers]?.map(
          (answer) => answer[AnswerKeys.likes]?.map(
            (like) => like[LikeKeys.id]
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
