import Packets from '@shared/packets/ids';
import { EventKeys } from '@shared/models/event';
import { ResponseKeys as R, ResErrorKeys as E } from '@shared/packets/response/ResponseObject';

import { debug, error } from '~lib/logger';
import { workerId } from '~main';

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
    const eventResolved = await event.resolved(this.socket.auth.browserUUID);
    const currentEventId = eventResolved[EventKeys.id];

    this.socket.leaveAll();
    this.socket.join(currentEventId);
    this.socket.join(`${workerId}-${currentEventId}`);

    this.socket.auth = {
      ...this.socket.auth,
      currentEventId,
    };

    response({
      [R.success]: true,
      [R.data]: eventResolved,
    });
  } catch (err) {
    error(`${this.namespace.name}/event/get`, this.socket.id, err);

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
  Packets.Client.User.Event.Get,
  handler,
);
