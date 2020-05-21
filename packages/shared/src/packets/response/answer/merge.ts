import type { CreateResponseFn } from '~packets/response/Response';
import type { ResponseObject, ResponseKeys } from '~packets/response/ResponseObject';

type Data = undefined;

export type ResponseFn = CreateResponseFn<Data>;
export type Response = ResponseObject<Data>[ResponseKeys.data];
