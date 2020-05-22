import type { FBXAPI } from '~api';
import type { Packet } from '@shared/packets/server/bulk-update';

export interface Create {
  (this: FBXAPI, packet: Packet): void;
}
