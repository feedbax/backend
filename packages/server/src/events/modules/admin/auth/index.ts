import Packets from '@shared/packets/ids';
import { ResponseKeys, ResErrorKeys } from '@shared/packets/response/ResponseObject';

import { validateUUIDSync } from '~lib/validate-uuid';
import { debug } from '~lib/logger';

import { PacketsMap } from '~types/packets';
import { AuthError, ValidationError } from '~types/errors';

import type { Res, Auth } from './types';

const emptyFn = (..._args: any[]): void => { /* nothing */ };
const createRes: Res = (res) => (
  (err): void => {
    res({
      [ResponseKeys.success]: false,
      [ResponseKeys.data]: undefined,
      [ResponseKeys.error]: {
        [ResErrorKeys.name]: err.name,
        [ResErrorKeys.message]: err.message,
      },
    });
  }
);

const auth: Auth = (ns, socket) => (
  async (packet, next): Promise<void> => {
    const [packetId, _data, res = emptyFn] = packet;
    const response = createRes(res);

    debug(`${ns.name}/auth`, socket.id, PacketsMap.get(packetId));

    // let pass if login packet
    if (packetId === Packets.Client.Admin.Login) {
      return next();
    }

    // throw error if invalid uuid
    if (!validateUUIDSync(socket.auth.browserUUID)) {
      response(new ValidationError('invalid-uuid'));
      return undefined;
    }

    // throw error if UserModel is undefined
    if (socket.auth.AdminModel === undefined) {
      response(new AuthError('not-an-admin'));
      return undefined;
    }

    return next();
  }
);

export default auth;
