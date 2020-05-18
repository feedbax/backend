import Packets from '@shared/packets/ids';

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
    const eventResolved = await event.resolved;
    const currentEventId = eventResolved.id;

    this.socket.join(currentEventId);

    this.socket.auth = {
      ...this.socket.auth,

      browserUUID: packet.user.uuid,
      currentEventId,
    };

    response({
      success: true,
      data: eventResolved,
    });
  } catch (err) {
    error(`${this.namespace.name}/login`, this.socket.id, err);

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
  Packets.Client.User.Login,
  handler,
);
