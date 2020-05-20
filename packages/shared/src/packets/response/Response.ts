import type { ResponseObject } from '~packets/ResponseObject';

export type Response<T> = (res: ResponseObject<T | undefined>) => void;
