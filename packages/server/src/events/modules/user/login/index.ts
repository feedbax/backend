import Packets from '@shared/packets/ids';
import { EventKeys } from '@shared/models/event';
import { ResponseKeys as R, ResErrorKeys as E } from '@shared/packets/response/ResponseObject';

import { debug, error } from '~lib/logger';
import { validateUUIDSync } from '~lib/validate-uuid';

import { EventHandler } from '~events/helper/event-handler';
import statics from '~models/statics';

import type { Handler } from './types';

const handler: Handler = async function (this, packet, response) {
  const { EventModelStatic } = statics.models;

  const logPath = `${this.namespace.name}/login`;
  debug(logPath, this.socket.id, packet.event.slug, packet.user.uuid);

  try {
    if (!validateUUIDSync(packet.user.uuid)) {
      throw new Error('user-login-invalid-uuid');
    }

    const event = await EventModelStatic.get({ slug: packet.event.slug });
    const eventResolved = await event.resolved(packet.user.uuid);
    const currentEventId = eventResolved[EventKeys.id];

    this.socket.join(currentEventId);

    this.socket.auth = {
      ...this.socket.auth,

      browserUUID: packet.user.uuid,
      currentEventId,
    };

    response({
      [R.success]: true,
      [R.data]: eventResolved,
    });
  } catch (err) {
    error(`${this.namespace.name}/login`, this.socket.id, err);

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
  Packets.Client.User.Login,
  handler,
);
