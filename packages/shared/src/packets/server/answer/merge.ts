import type { $Context, ContextKeys } from '~packets/context';

type ContextProps = ContextKeys.questionId | ContextKeys.answerId;

export type Context = (
  Pick<$Context, ContextProps> & {
    // branding is necessary to preserve custom type in intellisense
    __brand?: unknown;
  }
);

// branding is necessary to preserve custom type in intellisense
type QuestionId = string & { __brand?: unknown };
type AnswerId = string & { __brand?: unknown };
type LikesCount = number & { __brand?: unknown };

export type LikeUpdateAnswer = [AnswerId, LikesCount];
export type LikeUpdateQuestion = [QuestionId, LikesCount];

export type DestroyedAnswersIds = string[] & { __brand?: unknown };

export type Packet = [
  Context,
  LikeUpdateAnswer,
  LikeUpdateQuestion,
  DestroyedAnswersIds
];
