import type { CreateResponseFn } from '~packets/response/Response';
import type { Packet } from '~packets/server/answer/create';

export type ResponseFn = CreateResponseFn<Packet>;
export type Response = NonNullable<Parameters<ResponseFn>[0]['data']>;
