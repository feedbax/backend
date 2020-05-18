import type { EventProperties } from '@shared/models/event';

import type { UserModel } from '~models/User';
import type { EventModel } from '~models/Event';

export interface Props {
  user: UserModel;
}

export interface WithUser {
  (user: Props['user'], props: EventProperties): Promise<EventModel>;
}

export interface EventExists {
  (props: EventProperties): Promise<boolean>;
}

export interface Create {
  (props: EventProperties, data: Pick<Props, 'user'>): Promise<EventModel>;
}
