import type { Packet as PacketIn } from '@shared/packets/client/answer/merge';
import type { EventHandler } from '~events/helper/event-handler';
import type { Response } from '~types/packets/Response';

type ResponseFn = Response<undefined>;

export interface Handler {
  (this: EventHandler, packet: PacketIn, response: ResponseFn): Promise<void>;
}
