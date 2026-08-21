export interface ApiResult<T> {
  status: number;
  code: string;
  message: string;
  data: T;
}
