import { RESET_STATE } from '~store/types';

import * as ActionTypes from '~store/modules/questions/types/action-types';
import { Order, reducerAddQuestions, reducerRemoveQuestions } from './helper';

import type { QuestionsActions } from '~store/modules/questions/types';
import type { QuestionsState } from '~store/modules/questions/types';

const initialState: QuestionsState = {};

export default (state = { ...initialState }, action: QuestionsActions): QuestionsState => {
  switch (action.type) {
    case ActionTypes.ADD_QUESTION: {
      const question = action.payload;

      return Order.normalize({
        ...state,

        [question.id]: {
          ...question,
        },
      });
    }

    case ActionTypes.ADD_QUESTIONS: {
      const questions = action.payload;

      return Order.normalize(
        questions.reduce<QuestionsState>(
          reducerAddQuestions,
          { ...state },
        ),
      );
    }

    case ActionTypes.ADD_ANSWER: {
      const { questionId, answerId } = action.payload;
      const { [questionId]: question } = state;

      return {
        ...state,

        [question.id]: {
          ...question,

          answers: [
            ...question.answers,
            answerId,
          ],
        },
      };
    }

    case ActionTypes.ADD_LIKE: {
      const { questionId, likeId } = action.payload;
      const { [questionId]: question } = state;

      return {
        ...state,

        [question.id]: {
          ...question,

          likes: [
            ...question.likes,
            likeId,
          ],
        },
      };
    }

    case ActionTypes.ADD_LIKES: {
      const { questionId, likeIds } = action.payload;
      const { [questionId]: question } = state;

      return {
        ...state,

        [question.id]: {
          ...question,

          likes: [
            ...question.likes,
            ...likeIds,
          ],
        },
      };
    }

    case ActionTypes.REMOVE_QUESTION: {
      const questionIdRemove = action.payload;
      const { [questionIdRemove]: _removed, ...newState } = state;

      return Order.normalize(newState);
    }

    case ActionTypes.REMOVE_QUESTIONS: {
      const questionIdsRemove = action.payload;

      return Order.normalize(
        questionIdsRemove.reduce<QuestionsState>(
          reducerRemoveQuestions,
          { ...state },
        ),
      );
    }

    case ActionTypes.REMOVE_ANSWER: {
      const { questionId, answerId } = action.payload;
      const { [questionId]: question } = state;

      return {
        ...state,

        [question.id]: {
          ...question,

          answers: question.answers.filter(
            (_answerId) => _answerId !== answerId,
          ),
        },
      };
    }

    case ActionTypes.REMOVE_ANSWERS: {
      const { questionId, answerIds } = action.payload;
      const { [questionId]: question } = state;

      return {
        ...state,

        [question.id]: {
          ...question,

          answers: question.answers.filter(
            (answerId) => !answerIds.includes(answerId),
          ),
        },
      };
    }

    case ActionTypes.REMOVE_LIKE: {
      const { questionId, likeId } = action.payload;
      const { [questionId]: question } = state;

      return {
        ...state,

        [question.id]: {
          ...question,

          likes: question.likes.filter(
            (_likeId) => _likeId !== likeId,
          ),
        },
      };
    }

    case ActionTypes.REMOVE_LIKES: {
      const { questionId, likeIds } = action.payload;
      const { [questionId]: question } = state;

      return {
        ...state,

        [question.id]: {
          ...question,

          likes: question.likes.filter(
            (likeId) => !likeIds.includes(likeId),
          ),
        },
      };
    }

    case RESET_STATE: {
      return { ...initialState };
    }

    default:
      return state;
  }
};
