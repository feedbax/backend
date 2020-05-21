export enum ResponseKeys {
  success,
  data,
  error
}

export enum ResErrorKeys {
  name,
  message
}

export interface ResponseObject<T> {
  [ResponseKeys.success]: boolean;
  [ResponseKeys.data]: T;
  [ResponseKeys.error]?: {
    [ResErrorKeys.name]: string;
    [ResErrorKeys.message]: string;
  };
}
