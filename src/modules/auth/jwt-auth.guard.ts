import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { replace } from 'lodash'
import { UserService } from '../user/user.service'
import * as jwt from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService
    ) {
        super()
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest()
            const { headers } = request
            const { authorization } = headers
            const accessToken = authorization
                ? replace(authorization, 'Bearer', '')
                : undefined
            if (!accessToken) {
                throw new UnauthorizedException({
                    statusCode: 500,
                    message: 'not authorization',
                })
            }
            const jwt_secret = this.configService.get<string>('JWT_SECRET')
            const decoded = await jwt.verify(accessToken, jwt_secret)
            if (decoded) {
                const { userId } = decoded
                const user = await this.userService.getUserById(userId)
                if (!user) {
                    return false
                }
                return true
            }
            return false
        } catch (error) {
            throw new UnauthorizedException({
                statusCode: 500,
                message: error.message,
            })
        }
    }
}
