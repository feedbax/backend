import Packets from '@shared/packets/ids';

import type { Packet } from '@shared/packets/client/answer/create';
import type { Create } from './types';

const create: Create = async function (props) {
  const { answer, question } = props;

  if (question?.id && answer?.text) {
    const data: Packet = {
      question: { id: question.id },
      answer: { text: answer.text },
    };

    return this.sendPacket<Packet, undefined>({
      id: Packets.Client.User.Answer.Create,
      data: { ...data },
    });
  }

  throw new Error('fbxapi.actions.answer.create.no-arguments');
};

export default create;
export * from './types';
