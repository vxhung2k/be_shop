import { HttpResponseMetaData } from './response.interface'
import { ResponseDefault } from './response-default.interface'
import { OmitType, PickType } from '@nestjs/swagger'

export interface ResponsePagingMetaData extends HttpResponseMetaData {
    nextPage?: string
    previousPage?: string
    firstPage?: string
    lastPage?: string
}

export class ResponsePaging<T = Record<string, any>> extends PickType(
    ResponseDefault,
    ['message', 'statusCode']
) {
    readonly totalData: number
    totalPage?: number
    currentPage?: number
    perPage?: number
    _availableSearch?: string[]
    _availableSort?: string[]
    readonly _metadata?: ResponsePagingMetaData
    readonly data?: T[]
}
export class IResponsePaging extends OmitType(ResponsePaging, [
    'message',
    'statusCode',
]) {}
