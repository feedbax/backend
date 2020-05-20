import type { EventHandler } from '~events/helper/event-handler';
import type { Packet as PacketIn } from '@shared/packets/client/answer/create';
import type { ResponseFn } from '@shared/packets/response/answer/create';

export interface Handler {
  (this: EventHandler, packet: PacketIn, response: ResponseFn): Promise<void>;
}
