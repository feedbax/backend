import Packets from '@shared/packets/ids';

import { debug, error } from '~lib/logger';
import { userNamespace, adminNamespace } from '~server';

import { EventHandler } from '~events/helper/event-handler';
import { checkSessionVars, presetUserWithEvent } from '~events/helper/fbx-socket';

import statics from '~models/statics';

import type { Packet as PacketOut } from '@shared/packets/server/answer/create';
import type { Handler } from './types';

const handler: Handler = async function (this, packet, response) {
  const { AnswerModelStatic } = statics.models;

  const logPath = `${this.namespace.name}/answer/create`;
  debug(logPath, this.socket.id, JSON.stringify(packet));

  try {
    if (!checkSessionVars(this.socket, presetUserWithEvent)) return;

    // model(s) are part of the currently active event
    await this.socket
      .modelBelongsToSession({ questionId: packet.question.id });

    const { answer, question } = packet;

    const { currentEventId } = this.socket.auth;
    const { id: questionId } = question;
    const { text: answerText } = answer;

    const newAnswerProps = {
      text: answerText,
      author: this.socket.auth.browserUUID,
    };

    const newAnswerContext = {
      questionId: packet.question.id,
    };

    const CreatedAnswer = await AnswerModelStatic.create(newAnswerProps, newAnswerContext);
    const createdAnswer = CreatedAnswer.allProperties();

    const context = {
      question: { id: questionId },
    };

    const packetOut: PacketOut = [
      context,
      createdAnswer,
    ];

    userNamespace
      .to(currentEventId)
      .emit(
        Packets.Server.Answer.Create,
        ...packetOut,
      );

    adminNamespace
      .to(currentEventId)
      .emit(
        Packets.Server.Answer.Create,
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
  Packets.Client.User.Answer.Create,
  handler,
);
