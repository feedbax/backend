import { QuestionType } from '@shared/models/question';
import type { QuestionProperties } from '@shared/models/question';

export interface QuestionState extends QuestionProperties {
  id: string;
  eventId: string;
  answers: string[];
  likes: number;
  hasLiked: boolean;
}

export interface QuestionsState {
  [questionId: string]: QuestionState;
}

export const NoneQuestion: QuestionState = {
  id: '',
  eventId: '',
  order: 0,
  type: QuestionType.NONE,
  settings: {},
  text: '',
  likes: 0,
  hasLiked: false,
  answers: [],
};
