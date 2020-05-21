import type { EventResolvedFlat } from '~models/event';
import type { CreateResponseFn } from '~packets/response/Response';
import type { ResponseKeys, ResponseObject } from '~packets/response/ResponseObject';

type Data = EventResolvedFlat[];

export type ResponseFn = CreateResponseFn<Data>;
export type Response = ResponseObject<Data>[ResponseKeys.data];
