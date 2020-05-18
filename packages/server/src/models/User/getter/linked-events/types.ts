import type { UserModel } from '~models/User';
import type { EventModel } from '~models/Event';

export type GetterLinkedEvents = (this: UserModel) => Promise<EventModel[]>;
