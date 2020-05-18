type AnswerPropsRequired = import('~models/answer').AnswerPropsRequired;

export interface Packet {
  question: { id: string };
  answer: Omit<AnswerPropsRequired, 'author'>;
}
