import type { FBXAPI } from '~api';
import type { Packet } from '@shared/packets/server/like/destroy';

export interface Destroy {
  (this: FBXAPI, ...args: Packet): void;
}
