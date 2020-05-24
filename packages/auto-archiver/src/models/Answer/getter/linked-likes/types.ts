import type { AnswerModel } from '~models/Answer';
import type { LikeModel } from '~models/Like';

export type GetterLinkedLikes = (this: AnswerModel) => Promise<LikeModel[]>;
