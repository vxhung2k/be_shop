import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ResponseMiddlewareTime } from './time/response.middleware.time'

@Module({})
export class ResponseMiddlewareModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(ResponseMiddlewareTime)
    }
}
