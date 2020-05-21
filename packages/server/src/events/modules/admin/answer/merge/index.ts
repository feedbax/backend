import Packets from '@shared/packets/ids';
import { ResponseKeys as R, ResErrorKeys as E } from '@shared/packets/response/ResponseObject';

import { userNamespace, adminNamespace } from '~server';
import { debug, error } from '~lib/logger';

import { EventHandler } from '~events/helper/event-handler';
import { checkSessionVars, presetAdminWithEvent } from '~events/helper/fbx-socket';

import statics from '~models/statics';

import type { Packet as PacketOut } from '@shared/packets/server/answer/merge';
import type { Handler } from './types';

const handler: Handler = async function (packet, response) {
  const { AnswerModelStatic } = statics.models;

  const logPath = `${this.namespace.name}/answer/merge`;
  debug(logPath, this.socket.id, JSON.stringify(packet));

  try {
    if (!checkSessionVars(this.socket, presetAdminWithEvent)) return;

    // socket is admin of the currently active event
    await this.socket.auth.AdminModel
      .isAdminFor({ eventId: this.socket.auth.currentEventId });

    // model(s) are part of the currently active event
    // => socket is the admin of the model(s)
    await this.socket
      .modelBelongsToSession({
        answerIds: [
          packet.answer.keepId,
          ...packet.answer.mergeIds,
        ],
      });

    const { currentEventId } = this.socket.auth;

    const { answer } = packet;
    const { mergeIds, keepId } = answer;
    const mergeResult = await AnswerModelStatic.merge({ keepId, mergeIds });

    const {
      context,
      createdLikes,
      destroyedAnswersIds,
      destroyedLikesIds,
    } = mergeResult;

    const packetOut: PacketOut = [
      context,
      createdLikes,
      destroyedLikesIds,
      destroyedAnswersIds,
    ];

    userNamespace.to(currentEventId).emit(Packets.Server.Answer.Merge, ...packetOut);
    adminNamespace.to(currentEventId).emit(Packets.Server.Answer.Merge, ...packetOut);

    response({
      [R.success]: true,
      [R.data]: undefined,
    });
  } catch (err) {
    error(logPath, this.socket.id, err);

    response({
      [R.success]: false,
      [R.data]: undefined,
      [R.error]: {
        [E.name]: err.name,
        [E.message]: err.message,
      },
    });
  }
};

export default EventHandler.create(
  Packets.Client.Admin.Answer.Merge,
  handler,
);
