import type { QuestionsState } from '~store/modules/questions/types';
import type { QuestionState } from '~store/modules/questions/types';

export const reducerAddQuestions = (prev: QuestionsState, curr: QuestionState): QuestionsState => ({
  ...prev,
  [curr.id]: {
    ...curr,
  },
});

export const reducerRemoveQuestions = (prev: QuestionsState, curr: string): QuestionsState => {
  const { [curr]: _removed, ...newState } = prev;
  return newState;
};

export class Order {
  private static orderOriginalMap = new Map<string, number>();

  public static normalize = (state: QuestionsState): QuestionsState => {
    const normalized = { ...state };
    const questions = Object.values(normalized);

    const questionIds = Array.from(Order.orderOriginalMap.keys());

    for (let i = 0; i < questionIds.length; i += 1) {
      const questionId = questionIds[i];
      const questionExists = Object.prototype.hasOwnProperty.call(normalized, questionId);

      if (!questionExists) {
        Order.orderOriginalMap.delete(questionId);
      }
    }

    for (let i = 0; i < questions.length; i += 1) {
      const question = questions[i];

      if (!Order.orderOriginalMap.has(question.id)) {
        Order.orderOriginalMap.set(question.id, question.order);
      }
    }

    const orders = Array.from(Order.orderOriginalMap.entries());
    const ordersSorted = orders.sort(([_a, a], [_b, b]) => a - b);

    for (let i = 0; i < ordersSorted.length; i += 1) {
      const [questionId] = ordersSorted[i];
      normalized[questionId].order = i;
    }

    return normalized;
  };
}
