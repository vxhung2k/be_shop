import { Injectable } from '@nestjs/common'
import { IPaginationService } from './interface/pagination.service.interface'
import {
    PAGINATION_MAX_PAGE,
    PAGINATION_MAX_PER_PAGE,
    PAGINATION_PAGE,
    PAGINATION_PER_PAGE,
} from './const/const'

@Injectable()
export class PaginationService implements IPaginationService {
    getPage(page: number): number {
        return page > 0 ? page : PAGINATION_PAGE
    }

    getPerPage(perPage: number): number {
        return perPage
            ? perPage > PAGINATION_MAX_PER_PAGE
                ? PAGINATION_MAX_PER_PAGE
                : perPage
            : PAGINATION_PER_PAGE
    }

    getTotalPage(totalData: number, perPage: number): number {
        let totalPage = Math.ceil(totalData / perPage)
        totalPage = totalPage === 0 ? 1 : totalPage
        return totalPage
    }

    getOffset(page: number, perPage: number): number {
        page = page > PAGINATION_MAX_PAGE ? PAGINATION_MAX_PAGE : page
        perPage =
            perPage > PAGINATION_MAX_PER_PAGE
                ? PAGINATION_MAX_PER_PAGE
                : perPage
        const offset: number = (page - 1) * perPage
        return offset
    }
}
