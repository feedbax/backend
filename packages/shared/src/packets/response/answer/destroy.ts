import type { CreateResponseFn } from '~packets/response/Response';

export type ResponseFn = CreateResponseFn<undefined>;
export type Response = Parameters<ResponseFn>[0]['data'];
