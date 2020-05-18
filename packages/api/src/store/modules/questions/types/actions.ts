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

export interface AddLikeAction {
  type: typeof ActionTypes.ADD_LIKE;
  payload: {
    questionId: string;
    likeId: string;
  };
}

export interface AddLikesAction {
  type: typeof ActionTypes.ADD_LIKES;
  payload: {
    questionId: string;
    likeIds: string[];
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

export interface RemoveLikeAction {
  type: typeof ActionTypes.REMOVE_LIKE;
  payload: {
    questionId: string;
    likeId: string;
  };
}

export interface RemoveLikesAction {
  type: typeof ActionTypes.REMOVE_LIKES;
  payload: {
    questionId: string;
    likeIds: string[];
  };
}

export type QuestionsActions =
  | AddQuestionAction
  | AddQuestionsAction
  | AddAnswerAction
  | AddLikeAction
  | AddLikesAction
  | RemoveQuestionAction
  | RemoveQuestionsAction
  | RemoveAnswerAction
  | RemoveAnswersAction
  | RemoveLikeAction
  | RemoveLikesAction
  | ResetStateAction;
