import type { Packet as PacketIn } from '@shared/packets/client/login/user';
import type { ResponseFn } from '@shared/packets/response/login/user';
import type { EventHandler } from '~events/helper/event-handler';

export interface Handler {
  (this: EventHandler, packet: PacketIn, response: ResponseFn): Promise<void>;
}
