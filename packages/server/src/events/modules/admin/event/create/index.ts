import Packets from '@shared/packets/ids';
import { ResponseKeys as R, ResErrorKeys as E } from '@shared/packets/response/ResponseObject';

import { debug, error } from '~lib/logger';

import { EventHandler } from '~events/helper/event-handler';
import { checkSessionVars, presetAdminWithoutEvent } from '~events/helper/fbx-socket';

import type { Handler } from './types';

const handler: Handler = async function (packet, response) {
  const logPath = `${this.namespace.name}/event/create`;
  debug(logPath, this.socket.id, JSON.stringify(packet));

  try {
    if (!checkSessionVars(this.socket, presetAdminWithoutEvent)) return;

    const { AdminModel } = this.socket.auth;
    const { event } = packet;

    await AdminModel.createEvent({ ...event, settings: {} });

    const events = await AdminModel.linkedEvents;
    const eventsProps = events.map(($event) => $event.resolvedFlat);

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
  Packets.Client.Admin.Event.Create,
  handler,
);
