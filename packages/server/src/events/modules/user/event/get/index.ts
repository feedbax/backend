import Packets from '@shared/packets/ids';
import { EventKeys } from '@shared/models/event';
import { ResponseKeys, ResErrorKeys } from '@shared/packets/response/ResponseObject';

import { debug, error } from '~lib/logger';

import { EventHandler } from '~events/helper/event-handler';
import { checkSessionVars, presetUserWithoutEvent } from '~events/helper/fbx-socket';

import statics from '~models/statics';

import type { Handler } from './types';

const handler: Handler = async function (packet, response) {
  const { EventModelStatic } = statics.models;

  const logPath = `${this.namespace.name}/event/get`;
  debug(logPath, this.socket.id, JSON.stringify(packet));

  try {
    if (!checkSessionVars(this.socket, presetUserWithoutEvent)) return;

    if (this.socket.auth.AdminModel) {
      // if the user is an admin, check if the event belongs to him
      await this.socket.auth.AdminModel
        .isAdminFor({ eventId: packet.event.id });
    }

    const event = await EventModelStatic.get({ id: packet.event.id });
    const eventResolved = await event.resolved;
    const currentEventId = eventResolved[EventKeys.id];

    this.socket.leaveAll();
    this.socket.join(currentEventId);

    this.socket.auth = {
      ...this.socket.auth,
      currentEventId,
    };

    response({
      [ResponseKeys.success]: true,
      [ResponseKeys.data]: eventResolved,
    });
  } catch (err) {
    error(`${this.namespace.name}/event/get`, this.socket.id, err);

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
  Packets.Client.User.Event.Get,
  handler,
);
