export interface PagedResponseModel<T> {
	status: string;
	currentPage: number;
	totalItems: number;
	totalPages: number;
	items: T[];
}
