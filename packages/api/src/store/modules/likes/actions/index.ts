import flattenDeep from 'lodash.flattendeep';

import * as ActionTypes from '~store/modules/likes/types';
import * as Actions from './types';

export const addLikesByEvent: Actions.AddLikesByEvent = (event) => ({
  type: ActionTypes.ADD_LIKES,
  payload: flattenDeep(
    event.questions?.map(
      (question) => question.answers?.map(
        (answer) => answer.likes?.map(
          (like) => ({
            eventId: event.id,
            questionId: question.id,
            answerId: answer.id,
            ...like,
          }),
        ) || [],
      ) || [],
    ) || [],
  ),
});

export const addLike: Actions.AddLike = (context, like) => ({
  type: ActionTypes.ADD_LIKE,
  payload: {
    ...like,
    eventId: context.event.id,
    questionId: context.question.id,
    answerId: context.answer.id,
  },
});

export const addLikes: Actions.AddLikes = (context, likes) => ({
  type: ActionTypes.ADD_LIKES,
  payload: likes.map(
    (like) => ({
      ...like,
      eventId: context.event.id,
      questionId: context.question.id,
      answerId: context.answer.id,
    }),
  ) || [],
});

export const removeLikes: Actions.RemoveLikes = (likeIds) => ({
  type: ActionTypes.REMOVE_LIKES,
  payload: likeIds,
});

export const removeLike: Actions.RemoveLike = (likeId) => ({
  type: ActionTypes.REMOVE_LIKE,
  payload: likeId,
});
