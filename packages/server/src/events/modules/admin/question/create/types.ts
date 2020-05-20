import type { Packet as PacketIn } from '@shared/packets/client/question/create';
import type { EventHandler } from '~events/helper/event-handler';
import type { ResponseFn } from '@shared/packets/response/question/create';

export interface Handler {
  (this: EventHandler, packet: PacketIn, response: ResponseFn): Promise<void>;
}
