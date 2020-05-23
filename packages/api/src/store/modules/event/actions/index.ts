import { EventKeys as E } from '@shared/models/event';
import { QuestionKeys as Q } from '@shared/models/question';

import * as ActionTypes from '~store/modules/event/types';
import * as Actions from './types';


export const loadEvent: Actions.LoadEvent = (event) => ({
  type: ActionTypes.LOAD_EVENT,
  payload: {
    id: event[E.id],
    slug: event[E.slug],
    settings: event[E.settings],

    questions: event[E.questions]?.map(
      (question) => question[Q.id]
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
