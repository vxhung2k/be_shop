import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { RoleService } from './role.service'
import { includes, map, replace } from 'lodash'
import { ConfigService } from '@nestjs/config'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class RoleAdmin {
    public readonly keyRole: string
    constructor(
        private readonly roleService: RoleService,
        private readonly configService: ConfigService,
        keyRole: string
    ) {
        this.keyRole = keyRole
    }
    async canActive(context: ExecutionContext): Promise<boolean> {
        try {
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
            const jwt_secret = this.configService.get<string>('JWT_SECRET')

            const decoded = await jwt.verify(accessToken, jwt_secret)
            if (decoded) {
                const { userId } = decoded
                const roles = await this.roleService.getAllRoleByUserId(userId)
                if (!roles) {
                    return false
                }
                return includes(map(roles, 'key'), this.keyRole)
            }
        } catch (error) {
            throw new UnauthorizedException({
                statusCode: 500,
                message: error.message,
            })
        }
    }
}
