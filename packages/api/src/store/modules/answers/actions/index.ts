import flattenDeep from 'lodash.flattendeep';

import * as ActionTypes from '~store/modules/answers/types';
import * as Actions from './types';


export const addAnswersByEvent: Actions.AddAnswersByEvent = (event) => ({
  type: ActionTypes.ADD_ANSWERS,
  payload: flattenDeep(
    event.questions?.map(
      (question) => question.answers?.map(
        (answer) => ({
          eventId: event.id,
          questionId: question.id,
          ...answer,

          likes: answer.likes?.map(
            (like) => like.id
          ) || [],
        }),
      ) || [],
    ) || [],
  ),
});

export const addAnswers: Actions.AddAnswers = (eventId, questionId, answers) => ({
  type: ActionTypes.ADD_ANSWERS,
  payload: answers.map(
    (answer) => ({
      eventId,
      questionId,
      ...answer,

      likes: answer.likes?.map(
        (like) => like.id
      ) || [],
    }),
  ),
});

export const addAnswer: Actions.AddAnswer = (eventId, questionId, answer) => ({
  type: ActionTypes.ADD_ANSWER,
  payload: {
    eventId,
    questionId,
    ...answer,

    likes: answer.likes?.map(
      (like) => like.id
    ) || [],
  },
});

export const addLike: Actions.AddLike = (answerId, likeId) => ({
  type: ActionTypes.ADD_LIKE,
  payload: {
    answerId,
    likeId,
  },
});

export const addLikes: Actions.AddLikes = (answerId, likeIds) => ({
  type: ActionTypes.ADD_LIKES,
  payload: {
    answerId,
    likeIds,
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

export const removeLike: Actions.RemoveLike = (answerId, likeId) => ({
  type: ActionTypes.REMOVE_LIKE,
  payload: {
    answerId,
    likeId,
  },
});
