import type { CreateResponseFn } from '~packets/response/Response';
import type { ResponseObject, ResponseKeys } from '~packets/response/ResponseObject';
import type { Packet as PacketCreate } from '~packets/server/like/create';
import type { Packet as PacketDestroy } from '~packets/server/like/destroy';
import type { ToggleActions } from '~models/like';

export type CreatedAction = {
  action: ToggleActions.Created;
  payload: PacketCreate;
};

export type DestroyedAction = {
  action: ToggleActions.Destroyed;
  payload: PacketDestroy;
};

type Actions = CreatedAction | DestroyedAction;

export type ResponseFn = CreateResponseFn<Actions>;
export type Response = ResponseObject<Actions>[ResponseKeys.data];
