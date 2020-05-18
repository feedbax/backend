import Packets from '@shared/packets/ids';

import type { Packet } from '@shared/packets/client/event/create';
import type { Create, Return } from './types';

const create: Create = async function (props) {
  const { event } = props;

  if (event?.slug) {
    const data: Packet = {
      event,
    };

    return this.sendPacket<Packet, Return>({
      id: Packets.Client.Admin.Event.Create,
      data,
    });
  }

  throw new Error('fbxapi.actions.event.create.no-arguments');
};

export default create;
export * from './types';
