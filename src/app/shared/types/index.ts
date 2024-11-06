export interface PaginationParams {
  size: number;
  page: number;
  totalCount: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationParams;
}
