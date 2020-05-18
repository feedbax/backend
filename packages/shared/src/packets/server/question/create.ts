type CreatedQuestion = import('~models/question').QuestionResolved;
type CreatedAnswer = import('~models/answer').AnswerResolvedFlat;

type CreatedAnswers = CreatedAnswer[];

export type Packet = [CreatedQuestion, CreatedAnswers];
