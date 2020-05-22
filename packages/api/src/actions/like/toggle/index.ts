import Packets from '@shared/packets/ids';
import { ToggleActions } from '@shared/models/like';
import { ActionKeys as A } from '@shared/packets/response/like/toggle';

import likeCreateHandler from '~handlers/like/create';
import likeDestroyHandler from '~handlers/like/destroy';

import type { Packet } from '@shared/packets/client/like/toggle';
import type { Toggle, Response } from './types';

const toggle: Toggle = async function (props) {
  const { answer } = props;

  if (answer?.id) {
    const data: Packet = {
      answer: { id: answer.id },
    };

    return this.sendPacket<Packet, Response>({
      id: Packets.Client.User.Like.Toggle,
      data,
    }).then((res) => {
      // eslint-disable-next-line default-case
      switch (res[A.action]) {
        case ToggleActions.Created: {
          const [context] = res[A.payload];
          likeCreateHandler.bind(this)(context);
          break;
        }

        case ToggleActions.Destroyed: {
          const [context] = res[A.payload];
          likeDestroyHandler.bind(this)(context);
          break;
        }
      }
      return res;
    });
  }

  throw new Error('fbxapi.actions.like.toggle.no-arguments');
};

export default toggle;
export * from './types';
