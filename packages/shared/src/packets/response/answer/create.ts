import type { Response } from '~packets/response/Response';
import type { Packet } from '~packets/server/answer/create';

export type ResponseFn = Response<Packet>;
