import * as ActionTypes from './action-types';

import type { AnswerState } from './state';
import type { AnswerResolvedFlat } from '@shared/models/answer';
import type { ResetStateAction } from '~store/types';

export interface AddAnswerAction {
  type: typeof ActionTypes.ADD_ANSWER;
  payload: AnswerState;
}

export interface AddAnswersAction {
  type: typeof ActionTypes.ADD_ANSWERS;
  payload: AnswerState[];
}

export interface AddLikeAction {
  type: typeof ActionTypes.ADD_LIKE;
  payload: {
    answerId: string;
    likeId: string;
  };
}

export interface AddLikesAction {
  type: typeof ActionTypes.ADD_LIKES;
  payload: {
    answerId: string;
    likeIds: string[];
  };
}

export interface EditAnswerAction {
  type: typeof ActionTypes.EDIT_ANSWER;
  payload: AnswerResolvedFlat;
}

export interface RemoveAnswersAction {
  type: typeof ActionTypes.REMOVE_ANSWERS;
  payload: string[];
}

export interface RemoveAnswerAction {
  type: typeof ActionTypes.REMOVE_ANSWER;
  payload: string;
}

export interface RemoveLikeAction {
  type: typeof ActionTypes.REMOVE_LIKE;
  payload: {
    answerId: string;
    likeId: string;
  };
}

export type AnswersActions =
  | AddAnswerAction
  | AddAnswersAction
  | AddLikeAction
  | AddLikesAction
  | EditAnswerAction
  | RemoveAnswerAction
  | RemoveAnswersAction
  | RemoveLikeAction
  | ResetStateAction;
