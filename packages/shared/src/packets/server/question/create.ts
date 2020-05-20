import type { QuestionResolved as CreatedQuestion } from '~models/question';
import type { AnswerResolvedFlat as CreatedAnswer } from '~models/answer';

type CreatedAnswers = CreatedAnswer[];

export type Packet = [CreatedQuestion, CreatedAnswers];
