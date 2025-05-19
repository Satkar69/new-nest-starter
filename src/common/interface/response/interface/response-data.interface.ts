export interface IPaginationData<T = any> {
  data: Array<T>;
  warnings?: any;
  total: number;
  limit: number;
  page: number;
  previous?: string;
  next?: string;
}
