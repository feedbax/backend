import { RESET_STATE } from '~store/types';
import * as ActionTypes from '~store/modules/event/types/action-types';

import type { EventActions } from '~store/modules/event/types';
import type { EventState } from '~store/modules/event/types';

const initialState: EventState = {
  id: '',
  slug: '',
  settings: {},
  questions: [],
};

export default (state = { ...initialState }, action: EventActions): EventState => {
  switch (action.type) {
    case ActionTypes.LOAD_EVENT:
      return {
        ...action.payload,
      };

    case ActionTypes.ADD_QUESTION: {
      const question = action.payload;

      return {
        ...state,

        questions: [
          ...state.questions,
          question.id,
        ],
      };
    }

    case ActionTypes.REMOVE_QUESTION: {
      const questionId = action.payload;

      return {
        ...state,

        questions: [
          ...state.questions.filter(
            (_questionId) => _questionId !== questionId,
          ),
        ],
      };
    }

    case RESET_STATE:
      return { ...initialState };

    default:
      return state;
  }
};
