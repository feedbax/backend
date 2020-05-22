import type { $Context, ContextKeys } from '~packets/context';

type ContextProps = ContextKeys.questionId;

export type Context = (
  Pick<$Context, ContextProps> & {
    // branding is necessary to preserve custom type in intellisense
    __brand?: unknown;
  }
);

// branding is necessary to preserve custom type in intellisense
export type QuestionLikesCount = number & { __brand?: unknown };
export type DestroyedAnswerId = string & { __brand?: unknown };

export type Packet = [Context, QuestionLikesCount, DestroyedAnswerId];
