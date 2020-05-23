import { RESET_STATE } from '~store/types';
import * as ActionTypes from '~store/modules/answers/types/action-types';
import { reducerAddAnswers, reducerRemoveAnswers } from './helper';
import { AnswerKeys as A } from '@shared/models/answer';

import type { AnswersActions } from '~store/modules/answers/types';
import type { AnswersState } from '~store/modules/answers/types';

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
      const { [answer.id]: oldAnswer } = state;

      return {
        ...state,

        [answer.id]: {
          ...oldAnswer,
          ...answer,

          hasLiked: oldAnswer?.hasLiked || answer.hasLiked,
          isMine: oldAnswer?.isMine || answer.isMine,
        },
      };
    }

    case ActionTypes.INCREASE_LIKES: {
      const { answerId } = action.payload;
      const { [answerId]: answer } = state;

      return {
        ...state,

        [answer.id]: {
          ...answer,
          likes: answer.likes + 1,
        },
      };
    }

    case ActionTypes.INCREASE_LIKES_BY: {
      const { answerId, likesCount } = action.payload;
      const { [answerId]: answer } = state;

      return {
        ...state,

        [answer.id]: {
          ...answer,
          likes: answer.likes + likesCount,
        },
      };
    }

    case ActionTypes.EDIT_ANSWER: {
      const answer = action.payload;
      const { [answer[A.id]]: _answer } = state;

      return {
        ...state,

        [answer[A.id]]: {
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

    case ActionTypes.DECREASE_LIKES: {
      const { answerId } = action.payload;
      const { [answerId]: answer } = state;

      return {
        ...state,
        [answer.id]: {
          ...answer,
          likes: answer.likes - 1,
        },
      };
    }

    case ActionTypes.SET_HAS_LIKED: {
      const { answerId, hasLiked } = action.payload;
      const { [answerId]: answer } = state;

      return {
        ...state,

        [answer.id]: {
          ...answer,
          hasLiked,
        },
      };
    }

    case ActionTypes.SET_LIKES: {
      const { answerId, likes } = action.payload;
      const { [answerId]: answer } = state;

      return {
        ...state,

        [answer.id]: {
          ...answer,
          likes,
        },
      };
    }

    case RESET_STATE:
      return { ...initialState };

    default:
      return state;
  }
};
