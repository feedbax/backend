import Packets from '@shared/packets/ids';

import { debug, error } from '~lib/logger';
import { userNamespace, adminNamespace } from '~server';

import { EventHandler } from '~events/helper/event-handler';
import { checkSessionVars, presetAdminWithEvent } from '~events/helper/fbx-socket';

import statics from '~models/statics';

import type { Packet as PacketOut } from '@shared/packets/server/question/create';
import type { AnswerModel } from '~models/Answer';

import type { Handler } from './types';

const handler: Handler = async function (packet, response) {
  const { EventModelStatic } = statics.models;

  const logPath = `${this.namespace.name}/question/create`;
  debug(logPath, this.socket.id, JSON.stringify(packet));

  try {
    if (!checkSessionVars(this.socket, presetAdminWithEvent)) return;

    // socket is admin of the currently active event
    await this.socket.auth.AdminModel
      .isAdminFor({ eventId: this.socket.auth.currentEventId });

    const { currentEventId } = this.socket.auth;
    const { question, insertionType } = packet;

    const Event = await EventModelStatic.get({ id: currentEventId });
    const Question = await Event.createQuestion(question, insertionType);
    const answerPromises: Promise<AnswerModel>[] = [];

    if (question.answers) {
      for (let i = 0; i < question.answers.length; i += 1) {
        const answer = {
          ...question.answers[i],
          author: this.socket.auth.browserUUID,
        };

        const answerPromise = Question.createAnswer(answer, true);

        answerPromises.push(answerPromise);
      }
    }

    const Answers = await Promise.all(answerPromises);

    const questionResolved = await Question.resolved;
    const answersResolved = Answers.map((_a) => _a.allProperties());

    const packetOut: PacketOut = [
      questionResolved,
      answersResolved,
    ];

    userNamespace
      .to(currentEventId)
      .emit(
        Packets.Server.Question.Create,
        ...packetOut,
      );

    adminNamespace
      .to(currentEventId)
      .emit(
        Packets.Server.Question.Create,
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
  Packets.Client.Admin.Question.Create,
  handler,
);
