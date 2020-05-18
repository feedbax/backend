import { Store } from 'redux';
import EventEmitter from 'eventemitter3';

import io from 'socket.io-client';
import parser from 'socket.io-msgpack-parser';

import Packets from '@shared/packets/ids';

import store, { ApiStoreDefault, DispatchAll } from '~store';

import actions from '~actions';
import handlers from '~handlers';

import type { ResponseObject } from '@shared/packets/ResponseObject';

import type { Socket, ConnectOpts } from './types';
import type { SendPacket } from './types';

const connectOps = {
  parser,
  autoConnect: false,
  transports: ['websocket'],
} as ConnectOpts;

class FBXAPI extends EventEmitter {
  public static store: Store & DispatchAll = store;

  public socket: Socket;
  public uuid!: string;
  public store!: ApiStoreDefault;

  public logout = actions.logout;

  public constructor(url: string, namespace: 'admin' | 'user') {
    super();

    this.store = FBXAPI.store;
    this.socket = io(`${url}/${namespace}`, connectOps);

    this.addEventHandlers();
  }

  private addEventHandlers = (): void => {
    this.socket.on(Packets.Server.Like.Create, handlers.like.create.bind(this));
    this.socket.on(Packets.Server.Like.Destroy, handlers.like.destroy.bind(this));
    this.socket.on(Packets.Server.Answer.Create, handlers.answer.create.bind(this));
    this.socket.on(Packets.Server.Answer.Destroy, handlers.answer.destroy.bind(this));
    this.socket.on(Packets.Server.Answer.Edit, handlers.answer.edit.bind(this));
    this.socket.on(Packets.Server.Answer.Merge, handlers.answer.merge.bind(this));
    this.socket.on(Packets.Server.Question.Create, handlers.question.create.bind(this));
    this.socket.on(Packets.Server.Question.Destroy, handlers.question.destroy.bind(this));

    this.socket.on('connect', () => this.emit('connect'));
    this.socket.on('connect_error', (error: Error) => this.emit('connect_error', error));
    this.socket.on('connect_timeout', () => this.emit('timeout'));
    this.socket.on('error', (error: Error) => this.emit('error', error));
    this.socket.on('disconnect', (reason: string) => this.emit('disconnect', reason));
    this.socket.on('reconnect', (attemptNumber: number) => this.emit('reconnect', attemptNumber));
    this.socket.on('reconnect_attempt', (attemptNumber: number) => this.emit('reconnect_attempt', attemptNumber));
    this.socket.on('reconnecting', (attemptNumber: number) => this.emit('reconnecting', attemptNumber));
    this.socket.on('reconnect_error', (error: Error) => this.emit('reconnect_error', error));
    this.socket.on('reconnect_failed', () => this.emit('reconnect_failed'));
    this.socket.on('ping', () => this.emit('ping'));
    this.socket.on('pong', () => this.emit('pong'));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public sendPacket: SendPacket = async (packet): Promise<any> => {
    if (!this.uuid) {
      throw new Error('fbxapi.send-packet.no-uuid');
    }

    return new Promise((resolve, reject) => {
      const { id, data } = packet;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.socket.emit(id, data, (res: ResponseObject<any>) => {
        if (res.success) {
          resolve(res.data);
        } else {
          reject(res.error);
        }
      });
    });
  };
}

export default FBXAPI;
