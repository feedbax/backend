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

export interface LikeResolved extends LikeProperties {
  id: string;
}
