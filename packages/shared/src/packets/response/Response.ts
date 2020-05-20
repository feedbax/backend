import type { ResponseObject } from '~packets/ResponseObject';

export type CreateResponseFn<T> = (res: ResponseObject<T | undefined>) => void;
