import Packets from '@shared/packets/ids';
import { ResponseKeys as R, ResErrorKeys as E } from '@shared/packets/response/ResponseObject';

import { debug, error } from '~lib/logger';

import { EventHandler } from '~events/helper/event-handler';
import { checkSessionVars, presetAdminWithoutEvent } from '~events/helper/fbx-socket';

import type { Handler } from './types';
import statics from '~models/statics';

const handler: Handler = async function (packet, response) {
  const { EventModelStatic } = statics.models;

  const logPath = `${this.namespace.name}/event/destroy`;
  debug(logPath, this.socket.id, JSON.stringify(packet));

  try {
    if (!checkSessionVars(this.socket, presetAdminWithoutEvent)) return;

    // socket is admin of the (to be destroyed) event
    await this.socket.auth.AdminModel
      .isAdminFor({ eventId: packet.event.id });

    const { AdminModel } = this.socket.auth;
    const { event } = packet;

    await EventModelStatic.destroy({ eventId: event.id });

    const Events = await AdminModel.linkedEvents;
    const eventsProps = Events.map(($event) => $event.resolvedFlat);

    if (event.id === this.socket.auth.currentEventId) {
      this.socket.leave(event.id);
      this.socket.auth.currentEventId = undefined;
    }

    response({
      [R.success]: true,
      [R.data]: eventsProps,
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
  Packets.Client.Admin.Event.Destroy,
  handler,
);
