import type { FBXAPI } from '~api';
import type { Packet } from '@shared/packets/server/answer/edit';

export interface Edit {
  (this: FBXAPI, ...args: Packet): void;
}
