import type { AnswerProperties } from '@shared/models/answer';

export interface AnswerState extends Omit<AnswerProperties, 'author'> {
  id: string;
  eventId: string;
  questionId: string;
  likes: number;
  hasLiked: boolean;
  isMine: boolean;
}

export interface AnswersState {
  [answerId: string]: AnswerState;
}
