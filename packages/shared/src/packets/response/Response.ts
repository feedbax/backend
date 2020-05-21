import type { ResponseObject } from '~packets/response/ResponseObject';

export type CreateResponseFn<T> = (res: ResponseObject<T | undefined>) => void;
