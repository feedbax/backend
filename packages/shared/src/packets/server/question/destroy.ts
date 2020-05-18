// branding is necessary to preserve custom type in intellisense
export type DestroyedQuestionId = string & { __brand?: 'DestroyedQuestionId' };
export type DestroyedAnswersIds = string[] & { __brand?: 'DestroyedAnswersIds' };
export type DestroyedLikesIds = string[] & { __brand?: 'DestroyedLikesIds' };

export type Packet = [
  DestroyedQuestionId,
  DestroyedAnswersIds,
  DestroyedLikesIds
];
