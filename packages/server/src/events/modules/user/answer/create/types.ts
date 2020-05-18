import type { EventHandler } from '~events/helper/event-handler';
import type { Packet as PacketIn } from '@shared/packets/client/answer/create';
import type { Response } from '~types/packets/Response';

export type ResponseFn = Response<undefined>;

export interface Handler {
  (this: EventHandler, packet: PacketIn, response: ResponseFn): Promise<void>;
}
