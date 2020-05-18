import type { EventResolved } from '@shared/models/event';
import type { EventModel } from '~models/Event';

export type GetterResolved = (this: EventModel) => Promise<EventResolved>;
