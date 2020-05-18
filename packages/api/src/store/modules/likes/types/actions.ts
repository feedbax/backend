import * as ActionTypes from './action-types';

import type { LikeState } from './state';
import type { ResetStateAction } from '~store/types';

export interface AddLikeAction {
  type: typeof ActionTypes.ADD_LIKE;
  payload: LikeState;
}

export interface AddLikesAction {
  type: typeof ActionTypes.ADD_LIKES;
  payload: LikeState[];
}

export interface RemoveLikesAction {
  type: typeof ActionTypes.REMOVE_LIKES;
  payload: string[];
}

export interface RemoveLikeAction {
  type: typeof ActionTypes.REMOVE_LIKE;
  payload: string;
}

export type LikesActions =
  | AddLikeAction
  | AddLikesAction
  | RemoveLikesAction
  | RemoveLikeAction
  | ResetStateAction;
