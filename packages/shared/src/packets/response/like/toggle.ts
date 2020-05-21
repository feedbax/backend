import type { CreateResponseFn } from '~packets/response/Response';
import type { ResponseObject, ResponseKeys } from '~packets/response/ResponseObject';
import type { Packet as PacketCreate } from '~packets/server/like/create';
import type { Packet as PacketDestroy } from '~packets/server/like/destroy';
import type { ToggleActions } from '~models/like';

export enum ActionKeys {
  action,
  payload
}

export type CreatedAction = {
  [ActionKeys.action]: ToggleActions.Created;
  [ActionKeys.payload]: PacketCreate;
};

export type DestroyedAction = {
  [ActionKeys.action]: ToggleActions.Destroyed;
  [ActionKeys.payload]: PacketDestroy;
};

type Actions = CreatedAction | DestroyedAction;

export type ResponseFn = CreateResponseFn<Actions>;
export type Response = ResponseObject<Actions>[ResponseKeys.data];
