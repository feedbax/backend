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
  likes,
  isMine,
  hasLiked
}

// branding is necessary to preserve custom type in intellisense
type AnswerId = string & { __brand?: unknown };
type AnswerText = string & { __brand?: unknown };
type AnswerTime = number & { __brand?: unknown };
type AnswerLikesCount = number & { __brand?: unknown };
type AnswerIsMine = boolean & { __brand?: unknown };
type AnswerHasLiked = boolean & { __brand?: unknown };

export interface AnswerResolvedFlat {
  [AnswerKeys.id]: AnswerId;
  [AnswerKeys.text]: AnswerText;
  [AnswerKeys.time]: AnswerTime;
}

export interface AnswerResolved extends AnswerResolvedFlat {
  [AnswerKeys.likes]: AnswerLikesCount;
  [AnswerKeys.hasLiked]: AnswerHasLiked;
  [AnswerKeys.isMine]: AnswerIsMine;
}
