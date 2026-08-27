export interface ApiResult<T> {
  code: string;
  message: string;
  data: T;
}
