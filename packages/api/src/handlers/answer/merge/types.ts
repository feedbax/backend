import type { FBXAPI } from '~api';
import type { Packet } from '@shared/packets/server/answer/merge';

export interface Merge {
  (this: FBXAPI, ...args: Packet): void;
}
