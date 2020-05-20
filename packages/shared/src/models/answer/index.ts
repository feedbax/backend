import type { LikeResolved } from '~models/like';

export interface AnswerPropsOptional {
  time: number;
}

export interface AnswerPropsRequired {
  text: string;
  author: string;
}

export interface AnswerProperties
  extends AnswerPropsOptional,
    AnswerPropsRequired {}

export enum AnswerKeys {
  id,
  text,
  time,
  author,
  likes
}

// branding is necessary to preserve custom type in intellisense
type AnswerId = string & { __brand?: unknown };
type AnswerText = string & { __brand?: unknown };
type AnswerAuthor = string & { __brand?: unknown };
type AnswerTime = number & { __brand?: unknown };
type AnswerLikes = LikeResolved[];

export interface AnswerResolvedFlat {
  [AnswerKeys.id]: AnswerId;
  [AnswerKeys.text]: AnswerText;
  [AnswerKeys.author]: AnswerAuthor;
  [AnswerKeys.time]: AnswerTime;
}

export interface AnswerResolved extends AnswerResolvedFlat {
  [AnswerKeys.likes]: AnswerLikes;
}
