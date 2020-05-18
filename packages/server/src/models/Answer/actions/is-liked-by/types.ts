import type { AnswerModel } from '~models/Answer';
import type { LikeModel } from '~models/Like';

type IsLikedTuple = [boolean, LikeModel | undefined];

export interface IsLikedBy {
  (answer: AnswerModel, author: string): Promise<IsLikedTuple>;
}
