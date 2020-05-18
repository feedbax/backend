import * as ActionTypes from '~store/modules/event/types';
import * as Actions from './types';


export const loadEvent: Actions.LoadEvent = (event) => ({
  type: ActionTypes.LOAD_EVENT,
  payload: {
    ...event,

    questions: event.questions?.map(
      (question) => question.id
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
