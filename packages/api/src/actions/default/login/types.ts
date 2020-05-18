import type { FBXAPI } from '~api';

import type { EventResolved } from '@shared/models/event';
import type { EventResolvedFlat } from '@shared/models/event';

import type { Packet as LoginUserPacket } from '@shared/packets/client/login/user';
import type { Packet as LoginAdminPacket } from '@shared/packets/client/login/admin';

export interface Login {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (this: FBXAPI, props: any): Promise<any>;
}

export interface LoginUser {
  (this: FBXAPI, props: Pick<LoginUserPacket, 'event'>): Promise<EventResolved>;
}

export interface LoginAdmin {
  (this: FBXAPI, props: Omit2<LoginAdminPacket, 'user', 'uuid'>): Promise<EventResolvedFlat[]>;
}
