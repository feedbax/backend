import Packets from '@shared/packets/ids';
import { InsertionType } from '@shared/models/question';

import type { Packet } from '@shared/packets/client/question/create';
import type { Create } from './types';

const create: Create = async function (props) {
  const { question, insertionType = InsertionType.APPEND } = props;

  if (question?.text && question?.type) {
    const data: Packet = {
      insertionType,
      question: {
        type: question.type,
        text: question.text,
        answers: question.answers || [],
      },
    };

    return this.sendPacket<Packet, undefined>({
      id: Packets.Client.Admin.Question.Create,
      data,
    });
  }

  throw new Error('fbxapi.actions.question.create.no-arguments');
};

export default create;
export * from './types';
