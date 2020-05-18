import type { Namespace } from 'socket.io';
import type { FBXSocket } from '~events/helper/fbx-socket';

import type { Handler, Props } from './types';
import type { Create } from './types';

export const eventHandlerMap = new Map<string, EventHandler[]>();

export class EventHandler {
  public namespace: Namespace;
  public socket: FBXSocket;
  private handler: Handler;

  public constructor(props: Props) {
    const { namespace, socket } = props;
    const { packet } = props;
    const { id: packetId, handler } = packet;

    this.handler = handler.bind(this);
    this.namespace = namespace;
    this.socket = socket;

    this.socket.on(packetId, this.handler);
  }

  public static create: Create = (id, handler) => async (namespace, socket): Promise<void> => {
    if (!eventHandlerMap.has(`${socket.id}`)) {
      eventHandlerMap.set(`${socket.id}`, []);
    }

    const handlers = eventHandlerMap.get(`${socket.id}`) || [];

    handlers.push(
      new EventHandler({
        namespace,
        socket,
        packet: {
          id,
          handler,
        },
      }),
    );

    eventHandlerMap.set(`${socket.id}`, handlers);
  };
}
