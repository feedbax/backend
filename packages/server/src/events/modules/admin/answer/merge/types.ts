import type { Packet as PacketIn } from '@shared/packets/client/answer/merge';
import type { ResponseFn } from '@shared/packets/response/answer/merge';
import type { EventHandler } from '~events/helper/event-handler';

export interface Handler {
  (this: EventHandler, packet: PacketIn, response: ResponseFn): Promise<void>;
}
