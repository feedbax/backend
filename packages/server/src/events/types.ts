import type { Namespace } from 'socket.io';
import type { FBXSocket } from '~events/helper/fbx-socket';

export type Handler = {
  default: (namespace: Namespace, socket: FBXSocket) => Promise<void>;
};
