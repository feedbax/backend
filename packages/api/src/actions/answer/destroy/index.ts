import Packets from '@shared/packets/ids';

import type { Packet } from '@shared/packets/client/answer/destroy';
import type { Destroy } from './types';

const destroy: Destroy = async function (props) {
  const { answer } = props;

  if (answer?.id) {
    const data: Packet = {
      answer: { id: answer.id },
    };

    return this.sendPacket<Packet, undefined>({
      id: Packets.Client.Admin.Answer.Destroy,
      data,
    });
  }

  throw new Error('fbxapi.actions.answer.destroy.no-arguments');
};

export default destroy;
export * from './types';
