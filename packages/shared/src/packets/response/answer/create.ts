import type { CreateResponseFn } from '~packets/response/Response';
import type { ResponseObject, ResponseKeys } from '~packets/response/ResponseObject';
import type { Packet } from '~packets/server/answer/create';

type Data = Packet;

export type ResponseFn = CreateResponseFn<Data>;
export type Response = ResponseObject<Data>[ResponseKeys.data];
