import type { NohmModel, TTypedDefinitions } from 'nohm';
import type { EventModel } from '~models/Event';
import type { EventProperties } from '@shared/models/event';

export type Definitions = TTypedDefinitions<EventProperties>;

// eslint-disable-next-line import/prefer-default-export
export const isEventModel = (model: NohmModel): model is EventModel => (
  model.modelName === 'Event'
);
