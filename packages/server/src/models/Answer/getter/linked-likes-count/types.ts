import type { AnswerModel } from '~models/Answer';

export type GetterLinkedLikesCount = (this: AnswerModel) => Promise<number>;
