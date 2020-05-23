import type { QuestionModel } from '~models/Question';

export type GetterLinkedLikesCount = (this: QuestionModel) => Promise<number>;
