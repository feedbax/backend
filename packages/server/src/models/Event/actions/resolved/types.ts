import type { EventResolved } from '@shared/models/event';
import type { EventModel } from '~models/Event';

export type GetterResolved = (event: EventModel, userUUID: string) => Promise<EventResolved>;
