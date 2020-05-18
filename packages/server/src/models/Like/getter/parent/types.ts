import type { AnswerModel } from '~models/Answer';
import type { LikeModel } from '~models/Like';

export type GetterParent = (this: LikeModel) => Promise<AnswerModel>;
