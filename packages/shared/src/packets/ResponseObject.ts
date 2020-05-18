export interface ResponseObject<T> {
  success: boolean;

  data: T;

  error?: {
    name: string;
    message: string;
  };
}
