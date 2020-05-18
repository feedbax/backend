type Context = {
  question: { id: string };
  answer: { id: string };
};

// branding is necessary to preserve custom type in intellisense
type DestroyedLikeId = string & { __brand?: 'DestroyedLikeId' };

export type Packet = [Context, DestroyedLikeId];
