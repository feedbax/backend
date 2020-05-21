import type { $Context, ContextKeys } from '~packets/context';

type ContextProps = ContextKeys.questionId;

export type Context = (
  Pick<$Context, ContextProps> & {
    // branding is necessary to preserve custom type in intellisense
    __brand?: unknown;
  }
);

// branding is necessary to preserve custom type in intellisense
type QuestionId = string & { __brand?: unknown };
type LikesCount = number & { __brand?: unknown };

export type LikeUpdateQuestion = [QuestionId, LikesCount];

// branding is necessary to preserve custom type in intellisense
export type DestroyedAnswerId = string & { __brand?: unknown };

export type Packet = [Context, LikeUpdateQuestion, DestroyedAnswerId];
