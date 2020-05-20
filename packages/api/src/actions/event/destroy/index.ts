import Packets from '@shared/packets/ids';

import type { Packet } from '@shared/packets/client/event/destroy';
import type { Destroy, Response } from './types';

const destroy: Destroy = async function (props) {
  const { event } = props;

  if (event?.id) {
    const data: Packet = {
      event: { id: event.id },
    };

    return this.sendPacket<Packet, Response>({
      id: Packets.Client.Admin.Event.Destroy,
      data,
    });
  }

  throw new Error('fbxapi.actions.event.destroy.no-arguments');
};

export default destroy;
export * from './types';
