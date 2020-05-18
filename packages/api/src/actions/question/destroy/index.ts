import Packets from '@shared/packets/ids';

import type { Packet } from '@shared/packets/client/question/destroy';
import type { Destroy } from './types';

const destroy: Destroy = async function (props) {
  const { question } = props;

  if (question?.id) {
    const data: Packet = {
      question: { id: question.id },
    };

    return this.sendPacket<Packet, undefined>({
      id: Packets.Client.Admin.Question.Destroy,
      data,
    });
  }

  throw new Error('fbxapi.actions.question.destroy.no-arguments');
};

export default destroy;
export * from './types';
