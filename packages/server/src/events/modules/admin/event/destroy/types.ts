import type { Packet as PacketIn } from '@shared/packets/client/event/destroy';
import type { ResponseFn } from '@shared/packets/response/event/destroy';
import type { EventHandler } from '~events/helper/event-handler';

export interface Handler {
  (this: EventHandler, packet: PacketIn, response: ResponseFn): Promise<void>;
}
