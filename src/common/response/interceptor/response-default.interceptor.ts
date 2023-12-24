import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { HttpArgumentsHost } from '@nestjs/common/interfaces'
import { Reflector } from '@nestjs/core'
import {
    ClassConstructor,
    ClassTransformOptions,
    plainToInstance,
} from 'class-transformer'
import { Response } from 'express'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import {
    MESSAGE_RESPONSE_DEFAULT_META_KEY,
    RESPONSE_DEFAULT_META_KEY,
} from '../const/const'
import { ResponseDefault } from '../interface/response-default.interface'
import { ResponseBasic } from '../interface/response.interface'

@Injectable()
export class ResponseDefaultInterceptor<T> implements NestInterceptor<T> {
    constructor(private readonly reflector: Reflector) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Promise<Observable<Promise<ResponseDefault>>> {
        if (context.getType() === 'http') {
            return next.handle().pipe(
                map(async (responseData: Promise<Record<string, any>>) => {
                    const ctx: HttpArgumentsHost = context.switchToHttp()
                    const responseExpress: Response = ctx.getResponse()
                    const requestExpress = ctx.getRequest<any>()
                    const classSerialization: ClassConstructor<ClassTransformOptions> =
                        this.reflector.get<
                            ClassConstructor<ClassTransformOptions>
                        >(RESPONSE_DEFAULT_META_KEY, context.getHandler())
                    // message base on language
                    const { customLang } = ctx.getRequest<any>()

                    // default response
                    const __statusCode = responseExpress.statusCode
                    const __message = this.reflector.get<string>(
                        MESSAGE_RESPONSE_DEFAULT_META_KEY,
                        context.getHandler()
                    )

                    // get _metadata
                    const __path = requestExpress.path
                    const __requestId = requestExpress.id
                    const __timestamp = requestExpress.timestamp
                    const __timezone =
                        Intl.DateTimeFormat().resolvedOptions().timeZone
                    const __version = requestExpress.version
                    const __repoVersion = requestExpress.repoVersion
                    const resMetadata = {
                        languages: customLang,
                        timestamp: __timestamp,
                        timezone: __timezone,
                        requestId: __requestId,
                        path: __path,
                        version: __version,
                        repoVersion: __repoVersion,
                    }
                    const response = (await responseData) as ResponseBasic
                    if (response) {
                        const { _metadata, ...data } = response
                        let serialization = data
                        if (classSerialization) {
                            serialization = plainToInstance(
                                classSerialization,
                                data
                            )
                        }
                        serialization =
                            serialization &&
                            Object.keys(serialization).length > 0
                                ? serialization
                                : undefined

                        return {
                            statusCode: __statusCode,
                            message: __message,
                            _metadata: { ...resMetadata, ..._metadata },
                            data: serialization,
                        }
                    }

                    return {
                        statusCode: __statusCode,
                        message: __message,
                        _metadata: resMetadata,
                    }
                })
            )
        }
        next.handle()
    }
}
