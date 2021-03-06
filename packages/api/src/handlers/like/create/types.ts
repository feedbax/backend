import type { FBXAPI } from '~api';
import type { Packet } from '@shared/packets/server/like/create';

export interface Create {
  (this: FBXAPI, ...args: Packet): void;
}
