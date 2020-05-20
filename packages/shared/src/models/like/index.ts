export enum ToggleActions {
  Created,
  Destroyed
}

export interface LikePropsRequired {
  author: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LikePropsOptional {}

export interface LikeProperties extends LikePropsRequired, LikePropsOptional {}

export enum LikeKeys {
  id,
  author
}

// branding is necessary to preserve custom type in intellisense
type LikeId = string & { __brand?: unknown };
type LikeAuthor = string & { __brand?: unknown };

export interface LikeResolved {
  [LikeKeys.id]: LikeId;
  [LikeKeys.author]: LikeAuthor;
}
