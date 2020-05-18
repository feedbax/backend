import Packets from '@shared/packets/ids';

import { debug, error } from '~lib/logger';
import { userNamespace, adminNamespace } from '~server';

import { EventHandler } from '~events/helper/event-handler';
import { checkSessionVars, presetUserWithEvent } from '~events/helper/fbx-socket';

import statics from '~models/statics';

import type { Packet as PacketOutCreate } from '@shared/packets/server/like/create';
import type { Packet as PacketOutDestroy } from '@shared/packets/server/like/destroy';

import type { Handler } from './types';
import { ToggleActions } from '@shared/models/like';

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

    let packetOut: PacketOutCreate | PacketOutDestroy;
    let packetId: string;

    // eslint-disable-next-line default-case
    switch (action) {
      case ToggleActions.Created: {
        const $packetOut: PacketOutCreate = [
          context,
          like,
        ];

        packetId = Packets.Server.Like.Create;
        packetOut = $packetOut;
        break;
      }

      case ToggleActions.Destroyed: {
        const $packetOut: PacketOutDestroy = [
          context,
          like.id,
        ];

        packetId = Packets.Server.Like.Destroy;
        packetOut = $packetOut;
        break;
      }
    }

    userNamespace
      .to(currentEventId)
      .emit(packetId, ...packetOut);

    adminNamespace
      .to(currentEventId)
      .emit(packetId, ...packetOut);

    response({
      success: true,
      data: undefined,
    });
  } catch (err) {
    error(`${this.namespace.name}/like/toggle`, this.socket.id, err);

    response({
      success: false,
      data: undefined,
      error: {
        name: err.name,
        message: err.message,
      },
    });
  }
};

export default EventHandler.create(
  Packets.Client.User.Like.Toggle,
  handler,
);
