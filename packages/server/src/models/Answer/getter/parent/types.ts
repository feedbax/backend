import type { AnswerModel } from '~models/Answer';
import type { QuestionModel } from '~models/Question';

export type GetterParent = (this: AnswerModel) => Promise<QuestionModel>;
