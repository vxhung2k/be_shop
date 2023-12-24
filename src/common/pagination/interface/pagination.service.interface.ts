export interface IPaginationService {
    getTotalPage(totalData: number, perPage: number): number
    getPage(page: number): number
    getPerPage(perPage: number): number
    getOffset(page: number, perPage: number): number
}
