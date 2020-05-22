import type { TTypedDefinitions } from 'nohm';

import type { AnswerProperties, AnswerResolved } from '@shared/models/answer';
import type { LikeProperties } from '@shared/models/like';

import type { QuestionModel } from '~models/Question';
import type { LikeModel } from '~models/Like';

import type { isLikedBy } from './actions/is-liked-by';
import type { move } from './actions/move';

export type Definitions = TTypedDefinitions<AnswerProperties>;

export type IsLikedBy = (userUUID: string) => ReturnType<isLikedBy>;
export type Move = (question: QuestionModel) => ReturnType<move>;
export type CreateLike = (props: LikeProperties) => Promise<LikeModel>;

export type Resolved = (userUUID: string) => Promise<AnswerResolved>;
