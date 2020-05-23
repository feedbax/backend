import type { UserModel } from '~models/User';
import type { UserResolved } from '@shared/models/user';

export type GetterResolved = (user: UserModel, userUUID: string) => Promise<UserResolved>;
