import type { Namespace } from 'socket.io';
import type { FBXSocket } from '~events/helper/fbx-socket';
import type { IncomingPacket } from '~types/packets';

export type Next = (err?: Error) => void;
export type Res = (res: (..._args: any[]) => void) => ((err: Error) => void);

export interface Auth {
  (namespace: Namespace, socket: FBXSocket): (
    (packet: IncomingPacket<any>, next: Next) => Promise<void>
  );
}
