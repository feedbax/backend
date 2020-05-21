import type { CreateResponseFn } from '~packets/response/Response';
import type { EventResolved } from '~models/event';
import type { ResponseObject, ResponseKeys } from '~packets/response/ResponseObject';

type Data = EventResolved;

export type ResponseFn = CreateResponseFn<Data>;
export type Response = ResponseObject<Data>[ResponseKeys.data];
