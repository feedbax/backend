import Packets from '@shared/packets/ids';
import { ResponseKeys as R, ResErrorKeys as E } from '@shared/packets/response/ResponseObject';

import { error, debug } from '~lib/logger';
import { validateUUIDSync } from '~lib/validate-uuid';

import { EventHandler } from '~events/helper/event-handler';
import statics from '~models/statics';

import type { Handler } from './types';

const handler: Handler = async function (packet, response) {
  const { UserModelStatic } = statics.models;

  const logPath = `${this.namespace.name}/login`;
  debug(logPath, this.socket.id, packet.user.uuid);

  try {
    if (!validateUUIDSync(packet.user.uuid)) {
      throw new Error('admin-login-invalid-uuid');
    }

    const user = await UserModelStatic.get(packet.user);
    const events = await user.linkedEvents;
    const eventsProps = events.map((event) => event.resolvedFlat);

    this.socket.auth = {
      ...this.socket.auth,

      AdminModel: user,
      browserUUID: packet.user.uuid,
    };

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
  Packets.Client.Admin.Login,
  handler,
);
