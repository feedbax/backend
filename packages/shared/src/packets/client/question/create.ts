import type { QuestionPropsRequired, InsertionType } from '~models/question';
import type { AnswerPropsRequired } from '~models/answer';


export interface MaybeAnswers {
  answers?: Omit<AnswerPropsRequired, 'author'>[];
}

export interface Packet {
  insertionType: InsertionType;
  question: QuestionPropsRequired & MaybeAnswers;
}
