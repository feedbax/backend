import type { AnswerPropsRequired } from '~models/answer';

export interface Packet {
  question: { id: string };
  answer: Omit<AnswerPropsRequired, 'author'>;
}
