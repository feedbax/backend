import type { UserModel } from '~models/User';
import type { EventModel } from '~models/Event';

export type GetterParent = (this: EventModel) => Promise<UserModel>;
