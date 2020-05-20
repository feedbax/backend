import type { AnswerProperties } from '@shared/models/answer';

export interface AnswerState extends AnswerProperties {
  id: string;
  eventId: string;
  questionId: string;
  likes: string[];
}

export interface AnswersState {
  [answerId: string]: AnswerState;
}
