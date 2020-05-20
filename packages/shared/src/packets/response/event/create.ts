import type { CreateResponseFn } from '~packets/response/Response';
import type { EventResolvedFlat } from '~models/event';

export type ResponseFn = CreateResponseFn<EventResolvedFlat[]>;
export type Response = NonNullable<Parameters<ResponseFn>[0]['data']>;
