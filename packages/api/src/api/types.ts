import type { FBXAPIUser } from './user';
import type { FBXAPIAdmin } from './admin';

export type Socket = SocketIOClient.Socket;
export type ConnectOpts = SocketIOClient.ConnectOpts;

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Obj = { [key: string]: string | number | Record<any, any> };
export type MaybeUser = { user?: { [key: string]: string | number | Record<any, any> } };

export type Packet<T> = { id: string; data: T };
export type AnyPacket = Packet<any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

export type APIType<T> = T extends 'user' ? FBXAPIUser : (T extends 'admin' ? FBXAPIAdmin : null);

export type Create = {
  (url: string, namespace: 'user'): FBXAPIUser;
  (url: string, namespace: 'admin'): FBXAPIAdmin;
};

export type SendPacket = {
  <T, U>(packet: Packet<T>): Promise<U>;
};
