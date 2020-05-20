import { EventKeys } from '@shared/models/event';
import { QuestionKeys } from '@shared/models/question';

import * as ActionTypes from '~store/modules/event/types';
import * as Actions from './types';


export const loadEvent: Actions.LoadEvent = (event) => ({
  type: ActionTypes.LOAD_EVENT,
  payload: {
    id: event[EventKeys.id],
    slug: event[EventKeys.slug],
    settings: event[EventKeys.settings],

    questions: event[EventKeys.questions]?.map(
      (question) => question[QuestionKeys.id]
    ) || [],
  },
});

export const addQuestion: Actions.AddQuestion = (question) => ({
  type: ActionTypes.ADD_QUESTION,
  payload: question,
});

export const removeQuestion: Actions.RemoveQuestion = (questionId) => ({
  type: ActionTypes.REMOVE_QUESTION,
  payload: questionId,
});
