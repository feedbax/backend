import Packets from '@shared/packets/ids';

import answerCreateHandler from '~handlers/answer/create';

import type { Packet } from '@shared/packets/client/answer/create';
import type { Create, Response } from './types';

const create: Create = async function (props) {
  const { answer, question } = props;

  if (question?.id && answer?.text) {
    const data: Packet = {
      question: { id: question.id },
      answer: { text: answer.text },
    };

    return this.sendPacket<Packet, Response>({
      id: Packets.Client.User.Answer.Create,
      data: { ...data },
    }).then((res) => {
      const [context, $answer] = res;
      answerCreateHandler.bind(this)(context, $answer);
      return res;
    });
  }

  throw new Error('fbxapi.actions.answer.create.no-arguments');
};

export default create;
export * from './types';
