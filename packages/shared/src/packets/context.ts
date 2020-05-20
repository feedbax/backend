export enum ContextKeys {
  eventId,
  questionId,
  answerId,
  likeId,
}

// branding is necessary to preserve custom type in intellisense
export type EventId = string & { __brand?: unknown };
export type QuestionId = string & { __brand?: unknown };
export type AnswerId = string & { __brand?: unknown };
export type LikeId = string & { __brand?: unknown };

export type $Context = {
  [ContextKeys.eventId]: EventId;
  [ContextKeys.questionId]: QuestionId;
  [ContextKeys.answerId]: AnswerId;
  [ContextKeys.likeId]: LikeId;
};
