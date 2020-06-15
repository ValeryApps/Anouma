export interface Pagination {
  currentPage:number;
  pageSize:number;
  totalItems:number
  totalPage:number;
}
export class PaginationResult<T> {
  result:T;
  pagination:Pagination;
}
