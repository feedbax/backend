import type { LikeResolved } from '@shared/models/like';

export interface LikeState extends LikeResolved {
  eventId: string;
  questionId: string;
  answerId: string;
}

export interface LikesState {
  [likeId: string]: LikeState;
}
