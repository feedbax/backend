type LikeResolved = import('~models/like').LikeResolved;

export type Context = {
  question: { id: string };
  answer: { id: string };
};

export type CreatedLikes = LikeResolved[];

// branding is necessary to preserve custom type in intellisense
export type DestroyedLikesIds = string[] & { __brand?: 'DestroyedLikesIds' };
export type DestroyedAnswersIds = string[] & { __brand?: 'DestroyedAnswersIds' };

export type Packet = [
  Context,
  CreatedLikes,
  DestroyedLikesIds,
  DestroyedAnswersIds
];
