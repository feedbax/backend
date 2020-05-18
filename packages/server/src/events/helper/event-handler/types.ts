import type { Namespace } from 'socket.io';
import type { FBXSocket } from '~events/helper/fbx-socket';

export type PacketHandler = (...args: any) => any;

export interface Props {
  namespace: Namespace;
  socket: FBXSocket;
  packet: {
    id: string;
    handler: PacketHandler;
  };
}

export interface Handler {
  (namespace: Namespace, socket: FBXSocket): Promise<void>;
}

export interface Create {
  (packetId: string, packetHandler: PacketHandler): Handler;
}
