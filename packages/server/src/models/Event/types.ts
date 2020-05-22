import type { NohmModel } from 'nohm';
import type { EventModel } from '~models/Event';

import type { QuestionModel } from '~models/Question';

import type { AnswerProperties } from '@shared/models/answer';
import type { EventProperties, EventResolved } from '@shared/models/event';
import type { QuestionPropsRequired, InsertionType } from '@shared/models/question';

import type { TTypedDefinitions } from 'nohm';

type MaybeAnswers = { answers?: Partial<AnswerProperties>[] };

export type Definitions = TTypedDefinitions<EventProperties>;

export type Resolved = (userUUID: string) => Promise<EventResolved>;

export type CreateQuestion = {
  (
    props: QuestionPropsRequired & MaybeAnswers,
    insertionType?: InsertionType,
  ): Promise<QuestionModel>;
};

// eslint-disable-next-line import/prefer-default-export
export const isEventModel = (model: NohmModel): model is EventModel => (
  model.modelName === 'Event'
);
