type LikeResolved = import('~models/like').LikeResolved;

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

export interface AnswerResolvedFlat extends AnswerProperties {
  id: string;
}

export interface AnswerResolved extends AnswerProperties {
  id: string;
  likes: LikeResolved[];
}
