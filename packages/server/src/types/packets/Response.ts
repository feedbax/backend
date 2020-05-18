import type { ResponseObject } from '@shared/packets/ResponseObject';

export type Response<T> = (res: ResponseObject<T | undefined>) => void;
