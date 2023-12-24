import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { HttpArgumentsHost } from '@nestjs/common/interfaces'
import { Response } from 'express'
import { Observable } from 'rxjs'
import { HelperDateTimeService } from 'src/helper/service/helper.datetime.service'

@Injectable()
export class ResponseCustomHeaderInterceptor implements NestInterceptor {
    constructor(private readonly helperDateService: HelperDateTimeService) {}
    async intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Promise<Observable<Promise<any> | string>> {
        if (context.getType() === 'http') {
            const ctx: HttpArgumentsHost = context.switchToHttp()
            const responseExpress: Response = ctx.getResponse()
            const request = ctx.getRequest()

            if (request) {
                if (request.customLang) {
                    responseExpress.setHeader(
                        'x-custom-lang',
                        request.customLang
                    )
                }
                // if (request.timestamp) {
                //     responseExpress.setHeader('x-timestamp', request.timestamp)
                // } else {
                //     responseExpress.setHeader(
                //         'x-timestamp',
                //         this.helperDateService.timestamp()
                //     )
                // }
                responseExpress.setHeader(
                    'x-timezone',
                    Intl.DateTimeFormat().resolvedOptions().timeZone
                )
                if (request.id) {
                    responseExpress.setHeader('x-request-id', request.id)
                }
                if (request.version) {
                    responseExpress.setHeader('x-version', request.version)
                }
                if (request.repoVersion) {
                    responseExpress.setHeader(
                        'x-repo-version',
                        request.repoVersion
                    )
                }
            }

            return next.handle()
        }

        return next.handle()
    }
}
