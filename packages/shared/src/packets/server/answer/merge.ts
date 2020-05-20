import type { $Context, ContextKeys } from '~packets/context';
import type { LikeResolved } from '~models/like';

type ContextProps = ContextKeys.questionId | ContextKeys.answerId;

export type Context = (
  Pick<$Context, ContextProps> & {
    // branding is necessary to preserve custom type in intellisense
    __brand?: unknown;
  }
);

export type CreatedLikes = LikeResolved[];

// branding is necessary to preserve custom type in intellisense
export type DestroyedLikesIds = string[] & { __brand?: unknown };
export type DestroyedAnswersIds = string[] & { __brand?: unknown };

export type Packet = [
  Context,
  CreatedLikes,
  DestroyedLikesIds,
  DestroyedAnswersIds
];
