import type { Packet as PacketIn } from '@shared/packets/client/like/toggle';
import type { ResponseFn } from '@shared/packets/response/like/toggle';
import type { EventHandler } from '~events/helper/event-handler';

export interface Handler {
  (this: EventHandler, packet: PacketIn, response: ResponseFn): Promise<void>;
}
