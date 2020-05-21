import Packets from '@shared/packets/ids';
import { ToggleActions, LikeKeys } from '@shared/models/like';
import { ContextKeys } from '@shared/packets/context';
import { ResponseKeys, ResErrorKeys } from '@shared/packets/response/ResponseObject';

import { debug, error } from '~lib/logger';
import BulkUpdateBroadcast, { UpdateAction } from '~lib/update-broadcast';

import { EventHandler } from '~events/helper/event-handler';
import { checkSessionVars, presetUserWithEvent } from '~events/helper/fbx-socket';

import statics from '~models/statics';

import type { Packet as PacketOutCreate } from '@shared/packets/server/like/create';
import type { Packet as PacketOutDestroy } from '@shared/packets/server/like/destroy';
import { Response, ActionKeys } from '@shared/packets/response/like/toggle';

import type { Handler } from './types';

const handler: Handler = async function (this, packet, response) {
  const { LikeModelStatic } = statics.models;

  const logPath = `${this.namespace.name}/like/toggle`;
  debug(logPath, this.socket.id, JSON.stringify(packet));

  try {
    if (!checkSessionVars(this.socket, presetUserWithEvent)) return;

    const { answer } = packet;
    const { currentEventId } = this.socket.auth;
    const { id: answerId } = answer;

    const [action, context, like] = await LikeModelStatic.toggle(
      this.socket.auth.browserUUID,
      { answerId },
    );

    let $data: Response;

    // eslint-disable-next-line default-case
    switch (action) {
      case ToggleActions.Created: {
        const $packetOut: PacketOutCreate = [
          context,
          like,
        ];

        $data = {
          [ActionKeys.action]: action,
          [ActionKeys.payload]: $packetOut,
        };

        break;
      }

      case ToggleActions.Destroyed: {
        const $packetOut: PacketOutDestroy = [
          context,
          like[LikeKeys.id],
        ];

        $data = {
          [ActionKeys.action]: action,
          [ActionKeys.payload]: $packetOut,
        };

        break;
      }
    }

    const $questionId = context[ContextKeys.questionId];
    const $answerId = context[ContextKeys.answerId];

    BulkUpdateBroadcast.broadcast(currentEventId, {
      action: UpdateAction.UpdateLikes,
      payload: {
        questionId: $questionId,
        answerId: $answerId,
      },
    });

    response({
      [ResponseKeys.success]: true,
      [ResponseKeys.data]: $data,
    });
  } catch (err) {
    error(`${this.namespace.name}/like/toggle`, this.socket.id, err);

    response({
      [ResponseKeys.success]: false,
      [ResponseKeys.data]: undefined,
      [ResponseKeys.error]: {
        [ResErrorKeys.name]: err.name,
        [ResErrorKeys.message]: err.message,
      },
    });
  }
};

export default EventHandler.create(
  Packets.Client.User.Like.Toggle,
  handler,
);
