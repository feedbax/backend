import { RESET_STATE } from '~store/types';
import * as ActionTypes from '~store/modules/answers/types/action-types';
import { reducerAddAnswers, reducerRemoveAnswers } from './helper';

import type { AnswersActions } from '~store/modules/answers/types';
import type { AnswersState } from '~store/modules/answers/types';
import { AnswerKeys } from '@shared/models/answer';

const initialState: AnswersState = {};

export default (state = { ...initialState }, action: AnswersActions): AnswersState => {
  switch (action.type) {
    case ActionTypes.ADD_ANSWERS: {
      const answers = action.payload;

      return answers.reduce<AnswersState>(
        reducerAddAnswers,
        { ...state },
      );
    }

    case ActionTypes.ADD_ANSWER: {
      const answer = action.payload;

      return {
        ...state,

        [answer.id]: {
          ...answer,
        },
      };
    }

    case ActionTypes.ADD_LIKE: {
      const { answerId, likeId } = action.payload;
      const { [answerId]: answer } = state;

      return {
        ...state,

        [answer.id]: {
          ...answer,

          likes: [...answer.likes, likeId],
        },
      };
    }

    case ActionTypes.ADD_LIKES: {
      const { answerId, likeIds } = action.payload;
      const { [answerId]: answer } = state;

      return {
        ...state,

        [answer.id]: {
          ...answer,

          likes: [...answer.likes, ...likeIds],
        },
      };
    }

    case ActionTypes.EDIT_ANSWER: {
      const answer = action.payload;
      const { [answer[AnswerKeys.id]]: _answer } = state;

      return {
        ...state,

        [answer[AnswerKeys.id]]: {
          ..._answer,
          ...answer,
        },
      };
    }

    case ActionTypes.REMOVE_ANSWER: {
      const answerIdRemove = action.payload;
      const { [answerIdRemove]: _removed, ...newState } = state;

      return newState;
    }

    case ActionTypes.REMOVE_ANSWERS: {
      const answerIdsRemove = action.payload;

      return answerIdsRemove.reduce<AnswersState>(
        reducerRemoveAnswers,
        { ...state },
      );
    }

    case ActionTypes.REMOVE_LIKE: {
      const { answerId, likeId } = action.payload;
      const { [answerId]: answer } = state;

      return {
        ...state,
        [answer.id]: {
          ...answer,

          likes: answer.likes.filter(
            (_likeId) => _likeId !== likeId,
          ),
        },
      };
    }

    case RESET_STATE:
      return { ...initialState };

    default:
      return state;
  }
};
