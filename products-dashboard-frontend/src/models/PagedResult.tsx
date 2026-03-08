export interface PagedResult<T> {
    data: T[];
    pageSize: number;
    currentPage: number;
    totalCount: number;
}