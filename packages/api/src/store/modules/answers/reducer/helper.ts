import type { AnswersState } from '~store/modules/answers/types';
import type { AnswerState } from '~store/modules/answers/types';

export const reducerAddAnswers = (prev: AnswersState, curr: AnswerState): AnswersState => ({
  ...prev,
  [curr.id]: {
    ...curr,
  },
});

export const reducerRemoveAnswers = (prev: AnswersState, curr: string): AnswersState => {
  const { [curr]: _removed, ...newState } = prev;
  return newState;
};
