import type { EventResolved } from '@shared/models/event';
import type { Packet as PacketIn } from '@shared/packets/client/event/get';

import type { EventHandler } from '~events/helper/event-handler';
import type { Response } from '~types/packets/Response';

type ResponseFn = Response<EventResolved>;

export interface Handler {
  (this: EventHandler, packet: PacketIn, response: ResponseFn): Promise<void>;
}
