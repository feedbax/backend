import Packets from '@shared/packets/ids';
import { ContextKeys } from '@shared/packets/context';
import { ResponseKeys as R, ResErrorKeys as E } from '@shared/packets/response/ResponseObject';

import { debug, error } from '~lib/logger';
import BulkUpdateBroadcast, { UpdateAction } from '~lib/bulk-update-broadcast';

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
    const createdAnswer = CreatedAnswer.resolvedFlat;

    const context = {
      [ContextKeys.questionId]: questionId,
    };

    const packetOut: PacketOut = [
      context,
      createdAnswer,
    ];

    await BulkUpdateBroadcast.broadcast(currentEventId, {
      action: UpdateAction.AddAnswer,
      payload: packetOut,
    });

    response({
      [R.success]: true,
      [R.data]: packetOut,
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
  Packets.Client.User.Answer.Create,
  handler,
);
