import * as ActionTypes from './action-types';

import type { QuestionState } from './state';
import type { ResetStateAction } from '~store/types';

export interface AddQuestionAction {
  type: typeof ActionTypes.ADD_QUESTION;
  payload: QuestionState;
}

export interface AddQuestionsAction {
  type: typeof ActionTypes.ADD_QUESTIONS;
  payload: QuestionState[];
}

export interface AddAnswerAction {
  type: typeof ActionTypes.ADD_ANSWER;
  payload: {
    questionId: string;
    answerId: string;
  };
}

export interface IncreaseLikesAction {
  type: typeof ActionTypes.INCREASE_LIKES;
  payload: {
    questionId: string;
  };
}

export interface IncreaseLikesByAction {
  type: typeof ActionTypes.INCREASE_LIKES_BY;
  payload: {
    questionId: string;
    likesCount: number;
  };
}

export interface RemoveQuestionsAction {
  type: typeof ActionTypes.REMOVE_QUESTIONS;
  payload: string[];
}

export interface RemoveQuestionAction {
  type: typeof ActionTypes.REMOVE_QUESTION;
  payload: string;
}

export interface RemoveAnswerAction {
  type: typeof ActionTypes.REMOVE_ANSWER;
  payload: {
    questionId: string;
    answerId: string;
  };
}

export interface RemoveAnswersAction {
  type: typeof ActionTypes.REMOVE_ANSWERS;
  payload: {
    questionId: string;
    answerIds: string[];
  };
}

export interface DecreaseLikesAction {
  type: typeof ActionTypes.DECREASE_LIKES;
  payload: {
    questionId: string;
  };
}

export interface DecreaseLikesByAction {
  type: typeof ActionTypes.DECREASE_LIKES_BY;
  payload: {
    questionId: string;
    likesCount: number;
  };
}

export interface SetHasLikedAction {
  type: typeof ActionTypes.SET_HAS_LIKED;
  payload: {
    questionId: string;
    hasLiked: boolean;
  };
}

export interface SetLikesAction {
  type: typeof ActionTypes.SET_LIKES;
  payload: {
    questionId: string;
    likes: number;
  };
}

export type QuestionsActions =
  | AddQuestionAction
  | AddQuestionsAction
  | AddAnswerAction
  | IncreaseLikesAction
  | IncreaseLikesByAction
  | RemoveQuestionAction
  | RemoveQuestionsAction
  | RemoveAnswerAction
  | RemoveAnswersAction
  | DecreaseLikesAction
  | DecreaseLikesByAction
  | SetHasLikedAction
  | SetLikesAction
  | ResetStateAction;
