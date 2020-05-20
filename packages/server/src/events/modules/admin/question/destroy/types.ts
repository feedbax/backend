import type { Packet as PacketIn } from '@shared/packets/client/question/destroy';
import type { EventHandler } from '~events/helper/event-handler';
import type { ResponseFn } from '@shared/packets/response/question/destroy';

export interface Handler {
  (this: EventHandler, packet: PacketIn, response: ResponseFn): Promise<void>;
}
