import type { NohmModel } from 'nohm';

import type { AnswerModel } from '~models/Answer';
import type { LikeModel } from '~models/Like';

import type { Context } from '@shared/packets/server/answer/merge';
import type { QuestionLikesCount } from '@shared/packets/server/answer/merge';
import type { AnswerLikesCount } from '@shared/packets/server/answer/merge';
import type { DestroyedAnswersIds } from '@shared/packets/server/answer/merge';

export type ReturnType = {
  context: Context;
  questionLikes: QuestionLikesCount;
  answerLikes: AnswerLikesCount;
  destroyedAnswersIds: DestroyedAnswersIds;
};

export interface GetAnswersLikes {
  (answers: AnswerModel[]): Promise<LikeModel[]>;
}

export interface GetDistinctLikes {
  (likes: LikeModel[]): LikeModel[];
}

export interface GetLikesSubstraction {
  (allLikes: LikeModel[], likesToSub: LikeModel[]): LikeModel[];
}

export interface AddLikesToAnswer {
  (answer: AnswerModel, likes: LikeModel[]): Promise<LikeModel[]>;
}

export interface RemoveModels {
  <T extends NohmModel>(models: Array<T>): Promise<void[]>;
}

export interface GetIds {
  <T extends NohmModel>(model: T): string;
}

export interface Props {
  keep: AnswerModel;
  merge: AnswerModel[];
  keepId: string;
  mergeIds: string[];
}

export interface WithAnswer {
  (answerKeep: Props['keep'], answersMerge: Props['merge']): Promise<ReturnType>;
}

export interface WithAnswerId {
  (answerKeepId: Props['keepId'], answersMergeIds: Props['mergeIds']): Promise<ReturnType>;
}

export interface Merge {
  (props: Pick<Props, 'keep' | 'merge'>): Promise<ReturnType>;
  (props: Pick<Props, 'keepId' | 'mergeIds'>): Promise<ReturnType>;
}
