import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { includes, map, replace } from 'lodash'
import { ConfigService } from '@nestjs/config'
import * as jwt from 'jsonwebtoken'
import { Reflector } from '@nestjs/core'
import { RoleService } from '../role/role.service'
import { ROLE_META_DATA_KEY } from '../role/consts/const'

@Injectable()
export class RoleGuard implements CanActivate {
    public readonly jwt_secret: string
    constructor(
        private readonly roleService: RoleService,
        private readonly configService: ConfigService,
        private readonly reflector: Reflector
    ) {
        this.jwt_secret = this.configService.get<string>('JWT_SECRET')
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const role = this.reflector.get<string>(
                ROLE_META_DATA_KEY,
                context.getHandler()
            )
            const request = context.switchToHttp().getRequest()
            const { headers } = request
            const { authorization } = headers
            const accessToken = authorization
                ? replace(authorization, 'Bearer', '').trim()
                : undefined
            if (!accessToken) {
                throw new UnauthorizedException({
                    statusCode: 500,
                    message: 'not authorization',
                })
            }

            const decoded = await jwt.verify(accessToken, this.jwt_secret)
            if (decoded) {
                const { userId } = decoded
                const roles = await this.roleService.getAllRoleByUserId(userId)
                if (!roles) {
                    return false
                }
                return includes(map(roles, 'key'), role)
            }
        } catch (error) {
            throw new UnauthorizedException({
                statusCode: 500,
                message: error.message,
            })
        }
    }
}
