type CreatedAnswer = import('~models/answer').AnswerResolvedFlat;

type Context = {
  question: { id: string };
};

export type Packet = [Context, CreatedAnswer];
