import type { UserModel } from '~models/User';
import type { UserProperties } from '@shared/models/user';

export interface Create {
  (props: UserProperties): Promise<UserModel>;
}
