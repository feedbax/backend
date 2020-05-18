import Packets from '@shared/packets/ids';

import type { Packet } from '@shared/packets/client/like/toggle';
import type { Toggle } from './types';

const toggle: Toggle = async function (props) {
  const { answer } = props;

  if (answer?.id) {
    const data: Packet = {
      answer: { id: answer.id },
    };

    return this.sendPacket<Packet, undefined>({
      id: Packets.Client.User.Like.Toggle,
      data,
    });
  }

  throw new Error('fbxapi.actions.like.toggle.no-arguments');
};

export default toggle;
export * from './types';
