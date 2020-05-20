import flattenDeep from 'lodash.flattendeep';

import { EventKeys } from '@shared/models/event';
import { QuestionKeys } from '@shared/models/question';
import { AnswerKeys } from '@shared/models/answer';
import { LikeKeys } from '@shared/models/like';

import * as ActionTypes from '~store/modules/likes/types';
import * as Actions from './types';

export const addLikesByEvent: Actions.AddLikesByEvent = (event) => ({
  type: ActionTypes.ADD_LIKES,
  payload: flattenDeep(
    event[EventKeys.questions]?.map(
      (question) => question[QuestionKeys.answers]?.map(
        (answer) => answer[AnswerKeys.likes]?.map(
          (like) => ({
            eventId: event[EventKeys.id],
            questionId: question[QuestionKeys.id],
            answerId: answer[AnswerKeys.id],

            id: like[LikeKeys.id],
            author: like[LikeKeys.author],
          }),
        ) || [],
      ) || [],
    ) || [],
  ),
});

export const addLike: Actions.AddLike = (context, like) => ({
  type: ActionTypes.ADD_LIKE,
  payload: {
    id: like[LikeKeys.id],
    author: like[LikeKeys.author],
    eventId: context.eventId,
    questionId: context.questionId,
    answerId: context.answerId,
  },
});

export const addLikes: Actions.AddLikes = (context, likes) => ({
  type: ActionTypes.ADD_LIKES,
  payload: likes.map(
    (like) => ({
      id: like[LikeKeys.id],
      author: like[LikeKeys.author],
      eventId: context.eventId,
      questionId: context.questionId,
      answerId: context.answerId,
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
