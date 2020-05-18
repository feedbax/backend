type QuestionPropsRequired = import('~models/question').QuestionPropsRequired;
type AnswerPropsRequired = import('~models/answer').AnswerPropsRequired;

type InsertionType = import('~models/question').InsertionType;

export interface MaybeAnswers {
  answers?: Omit<AnswerPropsRequired, 'author'>[];
}

export interface Packet {
  insertionType: InsertionType;
  question: QuestionPropsRequired & MaybeAnswers;
}
