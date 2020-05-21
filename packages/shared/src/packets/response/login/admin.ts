import type { CreateResponseFn } from '~packets/response/Response';
import type { EventResolvedFlat } from '~models/event';
import type { ResponseObject, ResponseKeys } from '~packets/response/ResponseObject';

type Data = EventResolvedFlat[];

export type ResponseFn = CreateResponseFn<Data>;
export type Response = ResponseObject<Data>[ResponseKeys.data];
