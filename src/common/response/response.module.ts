import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ResponseCustomHeaderInterceptor } from './interceptor/response-custom-header.interceptor'
import { ResponseMiddlewareModule } from './middleware/response.middleware.module'

@Module({
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseCustomHeaderInterceptor,
        },
    ],
    imports: [ResponseMiddlewareModule],
})
export class ResponseModule {}
