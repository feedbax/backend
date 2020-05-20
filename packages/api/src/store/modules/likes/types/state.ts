import type { LikeProperties } from '@shared/models/like';

export interface LikeState extends LikeProperties {
  id: string;
  eventId: string;
  questionId: string;
  answerId: string;
}

export interface LikesState {
  [likeId: string]: LikeState;
}
