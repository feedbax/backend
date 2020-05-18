import type { QuestionProperties } from '@shared/models/question';
import type { AnswerPropsRequired } from '@shared/models/answer';

import type { AnswerModel } from '~models/Answer';

import type { TTypedDefinitions } from 'nohm';

export type Definitions = TTypedDefinitions<QuestionProperties>;

export type CreateAnswer = {
  (props: AnswerPropsRequired, isAdmin: boolean): Promise<AnswerModel>;
};
