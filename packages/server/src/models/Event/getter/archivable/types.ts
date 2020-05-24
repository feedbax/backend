import type { EventArchivable } from '@shared/models/event';
import type { EventModel } from '~models/Event';

export type GetterArchivable = (this: EventModel) => Promise<EventArchivable>;
