
import type { EventResolvedFlat } from '@shared/models/event';
import type { Packet as PacketIn } from '@shared/packets/client/login/admin';

import type { EventHandler } from '~events/helper/event-handler';
import type { Response } from '~types/packets/Response';

type ResponseFn = Response<EventResolvedFlat[]>;

export interface Handler {
  (this: EventHandler, packet: PacketIn, response: ResponseFn): Promise<void>;
}
