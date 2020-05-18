import { debug, error } from '~lib/logger';
import { EventHandler, eventHandlerMap } from '~events/helper/event-handler';

import type { Handler } from './types';

const handler: Handler = async function () {
  try {
    debug(`${this.namespace.name}/logout`, this.socket.id);

    this.socket.auth.AdminModel = undefined;
    this.socket.auth.browserUUID = undefined;
    this.socket.auth.currentEventId = undefined;
    this.socket.removeAllListeners();
    this.socket.leaveAll();

    eventHandlerMap.delete(`${this.socket.id}`);

    delete this.socket;
  } catch (err) {
    error(`${this.namespace.name}/logout`, this.socket.id, err);
  }
};

export default EventHandler.create('disconnect', handler);
