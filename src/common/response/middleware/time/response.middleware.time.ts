import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import responseTime from 'response-time'

@Injectable()
export class ResponseMiddlewareTime implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction): Promise<void> {
        responseTime()(req, res, next)
    }
}
