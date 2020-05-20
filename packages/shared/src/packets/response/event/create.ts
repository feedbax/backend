import type { Response } from '~packets/response/Response';
import type { EventResolvedFlat } from '~models/event';

export type ResponseFn = Response<EventResolvedFlat[]>;
