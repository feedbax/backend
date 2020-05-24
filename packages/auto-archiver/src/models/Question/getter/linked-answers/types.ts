import type { AnswerModel } from '~models/Answer';
import type { QuestionModel } from '~models/Question';

export type GetterLinkedAnswers = (this: QuestionModel) => Promise<AnswerModel[]>;
