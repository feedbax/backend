type CreatedLike = import('~models/like').LikeResolved;

type Context = {
  question: { id: string };
  answer: { id: string };
};

export type Packet = [Context, CreatedLike];
