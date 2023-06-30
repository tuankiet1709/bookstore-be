export default interface BaseQueryCriteria {
  search: string;
  limit: number;
  page: number;
  sortOrder: number;
  sortColumn: string;
}
