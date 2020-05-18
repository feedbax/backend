import Packets from '@shared/packets/ids';

import { Actions } from '~store/modules';

import type { Packet } from '@shared/packets/client/event/get';
import type { Get, Return } from './types';

const get: Get = async function (props) {
  const { event } = props;

  if (event?.id) {
    const data: Packet = { event };

    return this.sendPacket<Packet, Return>({
      id: Packets.Client.User.Event.Get,
      data,
    }).then((res) => {
      this.store.dispatchAll(
        Actions.Event.loadEvent(res),
        Actions.Question.addQuestionsByEvent(res),
        Actions.Answer.addAnswersByEvent(res),
        Actions.Like.addLikesByEvent(res),
      );

      return res;
    });
  }

  throw new Error('fbxapi.actions.event.get.no-arguments');
};

export default get;
export * from './types';
