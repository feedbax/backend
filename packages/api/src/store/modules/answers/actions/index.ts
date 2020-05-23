import flattenDeep from 'lodash.flattendeep';
import { EventKeys as E } from '@shared/models/event';
import { QuestionKeys as Q } from '@shared/models/question';
import { AnswerKeys as A } from '@shared/models/answer';

import * as ActionTypes from '~store/modules/answers/types';
import * as Actions from './types';

export const addAnswersByEvent: Actions.AddAnswersByEvent = (event) => ({
  type: ActionTypes.ADD_ANSWERS,
  payload: flattenDeep(
    event[E.questions]?.map(
      (question) => question[Q.answers]?.map(
        (answer) => ({
          id: answer[A.id],
          eventId: event[E.id],
          questionId: question[Q.id],
          text: answer[A.text],
          time: answer[A.time],
          likes: answer[A.likes],
          hasLiked: answer[A.hasLiked],
          isMine: answer[A.isMine],
        }),
      ) || [],
    ) || [],
  ),
});

export const addAnswers: Actions.AddAnswers = (eventId, questionId, answers) => ({
  type: ActionTypes.ADD_ANSWERS,
  payload: answers.map(
    (answer) => ({
      id: answer[A.id],
      eventId,
      questionId,
      text: answer[A.text],
      time: answer[A.time],
      likes: answer[A.likes] || 0,
      hasLiked: answer[A.hasLiked] || false,
      isMine: answer[A.isMine] || false,
    }),
  ),
});

export const addAnswer: Actions.AddAnswer = (eventId, questionId, answer) => ({
  type: ActionTypes.ADD_ANSWER,
  payload: {
    id: answer[A.id],
    eventId,
    questionId,
    text: answer[A.text],
    time: answer[A.time],
    likes: answer[A.likes] || 0,
    hasLiked: answer[A.hasLiked] || false,
    isMine: answer[A.isMine] || false,
  },
});

export const increaseLikes: Actions.IncreaseLikes = (answerId) => ({
  type: ActionTypes.INCREASE_LIKES,
  payload: {
    answerId,
  },
});

export const increaseLikesBy: Actions.IncreaseLikesBy = (answerId, likesCount) => ({
  type: ActionTypes.INCREASE_LIKES_BY,
  payload: {
    answerId,
    likesCount,
  },
});

export const editAnswer: Actions.EditAnswer = (answer) => ({
  type: ActionTypes.EDIT_ANSWER,
  payload: answer,
});

export const removeAnswers: Actions.RemoveAnswers = (answerIds) => ({
  type: ActionTypes.REMOVE_ANSWERS,
  payload: answerIds,
});

export const removeAnswer: Actions.RemoveAnswer = (answerId) => ({
  type: ActionTypes.REMOVE_ANSWER,
  payload: answerId,
});

export const decreaseLikes: Actions.DecreaseLikes = (answerId) => ({
  type: ActionTypes.DECREASE_LIKES,
  payload: {
    answerId,
  },
});

export const setHasLiked: Actions.SetHasLiked = (
  (answerId, hasLiked) => ({
    type: ActionTypes.SET_HAS_LIKED,
    payload: {
      answerId,
      hasLiked,
    },
  })
);

export const setLikes: Actions.SetLikes = (
  (answerId, likes) => ({
    type: ActionTypes.SET_LIKES,
    payload: {
      answerId,
      likes,
    },
  })
);
