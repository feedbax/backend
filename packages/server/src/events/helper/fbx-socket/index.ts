import { error } from 'winston';

import statics from '~models/statics';
import { AuthError } from '~types/errors';

import type { Socket } from 'socket.io';

import type { ModelCheck, CheckSessionVars, $FBXSocket } from './types';
import type { AuthDataKeys, GenericAuth, Auth } from './types';
import type { PresetAdminWithEvent, PresetAdminWithoutEvent } from './types';
import type { PresetUserWithEvent, PresetUserWithoutEvent } from './types';

export const presetAdminWithEvent: PresetAdminWithEvent = ['currentEventId', 'AdminModel', 'browserUUID'];
export const presetAdminWithoutEvent: PresetAdminWithoutEvent = ['AdminModel', 'browserUUID'];
export const presetUserWithEvent: PresetUserWithEvent = ['currentEventId', 'browserUUID'];
export const presetUserWithoutEvent: PresetUserWithoutEvent = ['browserUUID'];

export const check: CheckSessionVars = (
  <T extends AuthDataKeys>(socket: FBXSocket, toCheck: T[]): socket is $FBXSocket<T> => {
    let isAuth = true;

    for (let i = 0; i < toCheck.length; i += 1) {
      const checkKey = toCheck[i];
      const issetCheckKey = typeof socket.auth[checkKey] !== 'undefined';

      isAuth = isAuth && issetCheckKey;
    }

    if (!isAuth) {
      throw new AuthError('socket-has-no-valid-session');
    }

    return isAuth;
  }
);

export function checkSessionVars<T extends AuthDataKeys>(
  socket: FBXSocket,
  toCheck: T[],
): socket is (FBXSocket & GenericAuth<T>) {
  let isAuth = true;

  for (let i = 0; i < toCheck.length; i += 1) {
    const checkKey = toCheck[i];
    const issetCheckKey = typeof socket.auth[checkKey] !== 'undefined';

    isAuth = isAuth && issetCheckKey;
  }

  if (!isAuth) {
    throw new AuthError('socket-has-no-valid-session');
  }

  return isAuth;
}

export const modelBelongsToSession: ModelCheck = (
  async function (this: FBXSocket, props: any): Promise<any> {
    try {
      const eventId = this.auth.currentEventId || '';
      const itBelongs = await statics.models.EventModelStatic.checkModel(eventId, props);

      if (!itBelongs) {
        throw new AuthError('check-model--no-match');
      }
    } catch (err) {
      error('Event', 'checkModel', 'byModel', err);
      throw new AuthError('check-model--no-match');
    }
  }
);

export type FBXSocket = Socket & Auth & {
  modelBelongsToSession: ModelCheck;
};
