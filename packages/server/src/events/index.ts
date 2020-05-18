import { debug } from '~lib/logger';

import eventsAdmin from '~events/modules/admin';
import eventsUser from '~events/modules/user';

import adminAuth from '~events/modules/admin/auth';
import userAuth from '~events/modules/user/auth';

import { modelBelongsToSession } from '~events/helper/fbx-socket';
import { adminNamespace, userNamespace } from '~server';

import type { FBXSocket } from '~events/helper/fbx-socket';
import type { Handler } from './types';

export default async function registerEvents(): Promise<void> {
  const logout: Handler = await import('~events/logout');
  const $eventsAdmin = await Promise.all<Handler>(eventsAdmin);
  const $eventsUser = await Promise.all<Handler>(eventsUser);

  const events = {
    admin: [...$eventsAdmin, logout],
    user: [...$eventsUser, logout],
  };

  adminNamespace.on('connection', (socket: FBXSocket) => {
    // const { id, handshake } = socket;
    // const { address } = handshake;

    /* eslint-disable no-param-reassign */
    socket.auth = {};
    socket.modelBelongsToSession = (props: any): any => modelBelongsToSession.bind(socket)(props);
    /* eslint-enable no-param-reassign */

    debug(`${adminNamespace.name}/connection`, socket.id);

    socket.use(adminAuth(adminNamespace, socket));
    events.admin.forEach((event) => event.default(adminNamespace, socket));
  });

  userNamespace.on('connection', (socket: FBXSocket) => {
    // const { id, handshake } = socket;
    // const { address } = handshake;

    /* eslint-disable no-param-reassign */
    socket.auth = {};
    socket.modelBelongsToSession = (props: any): any => modelBelongsToSession.bind(socket)(props);
    /* eslint-enable no-param-reassign */

    debug(`${userNamespace.name}/connection`, socket.id);

    socket.use(userAuth(userNamespace, socket));
    events.user.forEach((event) => event.default(userNamespace, socket));
  });
}
