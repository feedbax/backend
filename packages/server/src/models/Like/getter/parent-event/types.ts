import type { LikeModel } from '~models/Like';
import type { EventModel } from '~models/Event';

export type GetterParentEvent = (this: LikeModel) => Promise<EventModel>;
