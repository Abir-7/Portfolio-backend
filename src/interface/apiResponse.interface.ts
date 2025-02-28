export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export interface IApiResponse<T> {
  message: string;
  statusCode: number;
  success: boolean;
  data: T;
  meta?: TMeta;
}
