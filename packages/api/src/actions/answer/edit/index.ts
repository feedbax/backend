import Packets from '@shared/packets/ids';

import type { Packet } from '@shared/packets/client/answer/edit';
import type { Edit } from './types';

const edit: Edit = (
  async function (props) {
    const { answer, newText } = props;

    if (newText && answer?.id) {
      const data: Packet = {
        answer: {
          id: answer.id,
          text: newText,
        },
      };

      return this.sendPacket<Packet, undefined>({
        id: Packets.Client.Admin.Answer.Edit,
        data,
      });
    }

    throw new Error('fbxapi.actions.answer.edit.no-arguments');
  }
);

export default edit;
export * from './types';
