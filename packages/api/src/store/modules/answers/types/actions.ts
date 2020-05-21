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

export interface IncreaseLikesAction {
  type: typeof ActionTypes.INCREASE_LIKES;
  payload: {
    answerId: string;
  };
}

export interface IncreaseLikesByAction {
  type: typeof ActionTypes.INCREASE_LIKES_BY;
  payload: {
    answerId: string;
    likesCount: number;
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

export interface DecreaseLikesAction {
  type: typeof ActionTypes.DECREASE_LIKES;
  payload: {
    answerId: string;
  };
}

export type AnswersActions =
  | AddAnswerAction
  | AddAnswersAction
  | IncreaseLikesAction
  | IncreaseLikesByAction
  | EditAnswerAction
  | RemoveAnswerAction
  | RemoveAnswersAction
  | DecreaseLikesAction
  | ResetStateAction;
