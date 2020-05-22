import type { LikeModel } from '~models/Like';
import type { QuestionModel } from '~models/Question';

type IsLikedTuple = [boolean, LikeModel[] | undefined];

export interface IsLikedBy {
  (question: QuestionModel, userUUID: string): Promise<IsLikedTuple>;
}
