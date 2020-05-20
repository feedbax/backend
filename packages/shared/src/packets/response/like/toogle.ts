import type { Response } from '~packets/response/Response';
import type { Packet as PacketCreate } from '~packets/server/like/create';
import type { Packet as PacketDestroy } from '~packets/server/like/destroy';

type Packet = PacketCreate | PacketDestroy;

export type ResponseFn = Response<Packet>;
