import type { LikeModel } from '~models/Like';
import type { QuestionModel } from '~models/Question';

export type GetterLinkedLikes = (this: QuestionModel) => Promise<LikeModel[]>;
