export default interface PageModel<T>{
    MaxPageSize: number;
    PageSize: number;
    CurrentPage: number;
    TotalItems: number;
    TotalPages: number;
    Items: T[];

}