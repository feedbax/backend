import * as ActionTypes from './action-types';

import type { EventState } from './state';
import type { QuestionResolved } from '@shared/models/question';
import type { ResetStateAction } from '~store/types';

export interface LoadEventAction {
  type: typeof ActionTypes.LOAD_EVENT;
  payload: EventState;
}

export interface AddQuestionAction {
  type: typeof ActionTypes.ADD_QUESTION;
  payload: QuestionResolved;
}

export interface RemoveQuestionAction {
  type: typeof ActionTypes.REMOVE_QUESTION;
  payload: string;
}

export type EventActions =
  | LoadEventAction
  | AddQuestionAction
  | RemoveQuestionAction
  | ResetStateAction;
