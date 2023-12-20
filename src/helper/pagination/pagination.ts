export class pagination<T> {
    public readonly page?: number
    public readonly limit?: number
    public readonly total?: number
    public readonly totalPage?: number
    public readonly pagingCounter?: number
    public readonly data?: T[]
    constructor(page?: number, limit?: number, total?: number, data?: T[]) {
        this.page = page
        this.limit = limit
    }
}
