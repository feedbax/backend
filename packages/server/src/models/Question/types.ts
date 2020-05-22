import type { TTypedDefinitions } from 'nohm';

import type { QuestionProperties, QuestionResolved } from '@shared/models/question';
import type { AnswerPropsRequired } from '@shared/models/answer';

import type { AnswerModel } from '~models/Answer';
import type { isLikedBy } from './actions/is-liked-by';

export type Definitions = TTypedDefinitions<QuestionProperties>;

export type CreateAnswer = {
  (props: AnswerPropsRequired, isAdmin: boolean): Promise<AnswerModel>;
};

export type IsLikedBy = (userUUID: string) => ReturnType<isLikedBy>;
export type Resolved = (userUUID: string) => Promise<QuestionResolved>;
