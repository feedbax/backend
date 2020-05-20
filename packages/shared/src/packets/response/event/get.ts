import type { CreateResponseFn } from '~packets/response/Response';
import type { EventResolved } from '~models/event';

export type ResponseFn = CreateResponseFn<EventResolved>;
export type Response = NonNullable<Parameters<ResponseFn>[0]['data']>;
