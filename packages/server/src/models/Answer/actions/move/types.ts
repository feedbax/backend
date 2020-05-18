import type { AnswerModel } from '~models/Answer';
import type { QuestionModel } from '~models/Question';

export interface Move {
  (answer: AnswerModel, question: QuestionModel): Promise<void>;
}
