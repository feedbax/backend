import Packets from '@shared/packets/ids';

import { userNamespace, adminNamespace } from '~server';
import { debug, error } from '~lib/logger';

import { EventHandler } from '~events/helper/event-handler';
import { checkSessionVars, presetAdminWithEvent } from '~events/helper/fbx-socket';

import statics from '~models/statics';

import type { Packet as PacketOut } from '@shared/packets/server/answer/destroy';
import type { Handler } from './types';

const handler: Handler = async function (packet, response) {
  const { AnswerModelStatic } = statics.models;

  const logPath = `${this.namespace.name}/answer/destroy`;
  debug(logPath, this.socket.id, JSON.stringify(packet));

  try {
    if (!checkSessionVars(this.socket, presetAdminWithEvent)) return;

    // socket is admin of the currently active event
    await this.socket.auth.AdminModel
      .isAdminFor({ eventId: this.socket.auth.currentEventId });

    // model(s) are part of the currently active event
    // => socket is the admin of the model(s)
    await this.socket
      .modelBelongsToSession({ answerId: packet.answer.id });

    const { currentEventId } = this.socket.auth;
    const { answer: { id: answerId } } = packet;

    const { context, destroyedAnswerId, destroyedLikesIds } = (
      await AnswerModelStatic.destroy({
        answerId,
      })
    );

    const packetOut: PacketOut = [
      context,
      destroyedAnswerId,
      destroyedLikesIds,
    ];

    userNamespace
      .to(currentEventId)
      .emit(
        Packets.Server.Answer.Destroy,
        ...packetOut,
      );

    adminNamespace
      .to(currentEventId)
      .emit(
        Packets.Server.Answer.Destroy,
        ...packetOut,
      );

    response({
      success: true,
      data: undefined,
    });
  } catch (err) {
    error(logPath, this.socket.id, err);

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
  Packets.Client.Admin.Answer.Destroy,
  handler,
);
