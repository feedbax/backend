import type { Response } from '~packets/response/Response';
import type { EventResolved } from '~models/event';

export type ResponseFn = Response<EventResolved>;
