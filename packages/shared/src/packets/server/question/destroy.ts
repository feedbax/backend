// branding is necessary to preserve custom type in intellisense
export type DestroyedQuestionId = string & { __brand?: unknown };
export type DestroyedAnswersIds = string[] & { __brand?: unknown };

export type Packet = [
  DestroyedQuestionId,
  DestroyedAnswersIds,
];
