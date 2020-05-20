import type { Packet as PacketIn } from '@shared/packets/client/answer/edit';
import type { ResponseFn } from '@shared/packets/response/answer/edit';
import type { EventHandler } from '~events/helper/event-handler';

export interface Handler {
  (this: EventHandler, packet: PacketIn, response: ResponseFn): Promise<void>;
}
