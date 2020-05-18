import Packets from '@shared/packets/ids';

import type { Packet } from '@shared/packets/client/answer/merge';
import type { Merge } from './types';

const merge: Merge = async function (props) {
  const { answer } = props;

  if (answer?.keepId && answer?.mergeIds) {
    const data: Packet = {
      answer,
    };

    return this.sendPacket<Packet, undefined>({
      id: Packets.Client.Admin.Answer.Merge,
      data,
    });
  }

  throw new Error('fbxapi.actions.answer.merge.no-arguments');
};

export default merge;
export * from './types';
