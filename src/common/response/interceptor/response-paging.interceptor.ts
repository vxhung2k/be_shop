import { ExecutionContext, Injectable } from '@nestjs/common'
import {
    CallHandler,
    HttpArgumentsHost,
    NestInterceptor,
} from '@nestjs/common/interfaces'
import { Reflector } from '@nestjs/core'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { Response } from 'express'
import * as qs from 'qs'
import { Observable, map } from 'rxjs'
import {
    MESSAGE_RESPONSE_PAGING_META_KEY,
    RESPONSE_PAGING_META_KEY,
} from '../const/const'
import {
    ResponsePaging,
    ResponsePagingMetaData,
} from '../interface/response-paging.interface'
import { omit } from 'lodash'
@Injectable()
export class ResponsePagingInterceptor<T>
    implements NestInterceptor<Promise<T>>
{
    constructor(private readonly reflector: Reflector) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Promise<Observable<Promise<ResponsePaging>>> {
        if (context.getType() === 'http') {
            return next.handle().pipe(
                map(async (responseData: Promise<ResponsePaging>) => {
                    //get config
                    const ctx: HttpArgumentsHost = context.switchToHttp()
                    const responseExpress: Response = ctx.getResponse()
                    const requestExpress = ctx.getRequest<any>()
                    const { customLang } = ctx.getRequest<any>()
                    //response
                    const response = (await responseData) as ResponsePaging
                    const {
                        totalData,
                        currentPage,
                        perPage,
                        data,
                        _availableSort,
                        _availableSearch,
                        totalPage,
                    } = response
                    const __statusCode = responseExpress.statusCode
                    let serializationData = data
                    const classSerialization: ClassConstructor<any> =
                        this.reflector.get<ClassConstructor<any>>(
                            RESPONSE_PAGING_META_KEY,
                            context.getHandler()
                        )

                    if (classSerialization) {
                        serializationData = plainToInstance(
                            classSerialization,
                            data
                        )
                    }

                    //convert meta data
                    const __message = this.reflector.get<string>(
                        MESSAGE_RESPONSE_PAGING_META_KEY,
                        context.getHandler()
                    )
                    const __path = requestExpress.path
                    const __timestamp = requestExpress.timestamp
                    const __timezone =
                        Intl.DateTimeFormat().resolvedOptions().timeZone
                    const __version = requestExpress.version
                    const __repoVersion = requestExpress.repoVersion
                    const path = requestExpress.path
                    const { query } = requestExpress
                    const queryString = qs.stringify(
                        omit(query, ['page', 'perPage']),
                        {
                            encode: false,
                        }
                    )

                    const newMetaData: ResponsePagingMetaData = {
                        nextPage:
                            currentPage < totalPage
                                ? `${path}?perPage=${perPage}&page=${
                                      currentPage + 1
                                  }&${queryString}`
                                : undefined,
                        previousPage:
                            currentPage > 1
                                ? `${path}?perPage=${perPage}&page=${
                                      currentPage - 1
                                  }&${queryString}`
                                : undefined,
                        firstPage:
                            totalPage > 1
                                ? `${path}?perPage=${perPage}&page=${1}&${queryString}`
                                : undefined,
                        lastPage:
                            totalPage > 1
                                ? `${path}?perPage=${perPage}&page=${totalPage}&${queryString}`
                                : undefined,
                        path: __path,
                        languages: customLang,
                        timestamp: __timestamp,
                        timezone: __timezone,
                        version: __version,
                        repoVersion: __repoVersion,
                    }

                    const responseHttp: ResponsePaging = {
                        statusCode: __statusCode,
                        message: __message,
                        totalData,
                        totalPage,
                        currentPage,
                        perPage,
                        _availableSearch,
                        _availableSort,
                        _metadata: newMetaData,
                        data: serializationData,
                    }
                    return responseHttp
                })
            )
        }
        return next.handle()
    }
}
