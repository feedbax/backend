import type { CreateResponseFn } from '~packets/response/Response';
import type { Packet as PacketCreate } from '~packets/server/like/create';
import type { Packet as PacketDestroy } from '~packets/server/like/destroy';

type Packet = PacketCreate | PacketDestroy;

export type ResponseFn = CreateResponseFn<Packet>;
export type Response = NonNullable<Parameters<ResponseFn>[0]['data']>;
