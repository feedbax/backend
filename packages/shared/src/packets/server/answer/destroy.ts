export type Context = {
  question: { id: string };
};

// branding is necessary to preserve custom type in intellisense
export type DestroyedAnswerId = string & { __brand?: 'DestroyedAnswerId' };
export type DestroyedLikesIds = string[] & { __brand?: 'DestroyedLikesIds' };

export type Packet = [Context, DestroyedAnswerId, DestroyedLikesIds];
