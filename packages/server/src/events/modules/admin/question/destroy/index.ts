import Packets from '@shared/packets/ids';
import { ResponseKeys as R, ResErrorKeys as E } from '@shared/packets/response/ResponseObject';

import { debug, error } from '~lib/logger';
import { userNamespace, adminNamespace } from '~server';

import { EventHandler } from '~events/helper/event-handler';
import { checkSessionVars, presetAdminWithEvent } from '~events/helper/fbx-socket';

import statics from '~models/statics';

import type { Packet as PacketOut } from '@shared/packets/server/question/destroy';
import type { Handler } from './types';

const handler: Handler = async function (packet, response) {
  const { QuestionModelStatic } = statics.models;

  const logPath = `${this.namespace.name}/question/destroy`;
  debug(logPath, this.socket.id, JSON.stringify(packet));

  try {
    if (!checkSessionVars(this.socket, presetAdminWithEvent)) return;

    // socket is admin of the currently active event
    await this.socket.auth.AdminModel
      .isAdminFor({ eventId: this.socket.auth.currentEventId });

    // model(s) are part of the currently active event
    // => socket is the admin of the model(s)
    await this.socket
      .modelBelongsToSession({ questionId: packet.question.id });

    const { currentEventId } = this.socket.auth;

    const {
      destroyedQuestionId,
      destroyedAnswersIds,
    } = await QuestionModelStatic.destroy({
      questionId: packet.question.id,
    });

    const packetOut: PacketOut = [
      destroyedQuestionId,
      destroyedAnswersIds,
    ];

    userNamespace
      .to(currentEventId)
      .emit(
        Packets.Server.Question.Destroy,
        ...packetOut,
      );

    adminNamespace
      .to(currentEventId)
      .emit(
        Packets.Server.Question.Destroy,
        ...packetOut,
      );

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
  Packets.Client.Admin.Question.Destroy,
  handler,
);
