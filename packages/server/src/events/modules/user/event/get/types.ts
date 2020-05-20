import type { Packet as PacketIn } from '@shared/packets/client/event/get';
import type { ResponseFn } from '@shared/packets/response/event/get';
import type { EventHandler } from '~events/helper/event-handler';

export interface Handler {
  (this: EventHandler, packet: PacketIn, response: ResponseFn): Promise<void>;
}
