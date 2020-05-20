import type { Packet as PacketIn } from '@shared/packets/client/answer/destroy';
import type { ResponseFn } from '@shared/packets/response/answer/destroy';
import type { EventHandler } from '~events/helper/event-handler';

export interface Handler {
  (this: EventHandler, packet: PacketIn, response: ResponseFn): Promise<void>;
}
