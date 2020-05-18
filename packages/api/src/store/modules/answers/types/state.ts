import type { AnswerResolvedFlat } from '@shared/models/answer';

export interface AnswerState extends AnswerResolvedFlat {
  eventId: string;
  questionId: string;
  likes: string[];
}

export interface AnswersState {
  [answerId: string]: AnswerState;
}
