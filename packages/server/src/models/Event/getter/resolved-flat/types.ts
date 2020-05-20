import type { EventResolvedFlat } from '@shared/models/event';
import type { EventModel } from '~models/Event';

export type GetterResolvedFlat = (this: EventModel) => EventResolvedFlat;
