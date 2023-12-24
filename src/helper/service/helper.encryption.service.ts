import { Injectable } from '@nestjs/common'
import { IHelperEncryptionService } from '../interface/helper.encryption.interface'
import { UserEntity } from 'src/entity/index.entity'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config'
import { IAccessToken } from '../interface/access-token.interface'
import { toNumber } from 'lodash'

@Injectable()
export class HelperEncryptService implements IHelperEncryptionService {
    private readonly jwt_secret: string
    private readonly crypt_salt: string
    private readonly expired_time_token: string
    private readonly expired_time_refresh_token: string
    constructor(private readonly configService: ConfigService) {
        ;(this.jwt_secret = this.configService.get<string>('JWT_SECRET')),
            (this.crypt_salt = this.configService.get<string>('SALT')),
            (this.expired_time_token =
                this.configService.get<string>('EXPIRED_TIME_TOKEN')),
            (this.expired_time_refresh_token = this.configService.get<string>(
                'EXPIRED_TIME_REFRESH_TOKEN'
            ))
    }

    async generateToken(user: UserEntity): Promise<string> {
        const payload: IAccessToken = {
            username: user.username,
            userId: user.id,
            user_type: user.user_type,
            exp:
                Math.floor(Date.now() / 1000) +
                toNumber(this.expired_time_token),
        }
        return await jwt.sign(payload, this.jwt_secret)
    }
    async generateRefreshToken(user: UserEntity): Promise<string> {
        const payload: IAccessToken = {
            username: user.username,
            userId: user.id,
            user_type: user.user_type,
            exp:
                Math.floor(Date.now() / 1000) +
                toNumber(this.expired_time_refresh_token),
        }
        return await jwt.sign(payload, this.jwt_secret)
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.crypt_salt)
    }

    async jwtVerifyAccessToken(
        token: string
    ): Promise<IAccessToken | undefined> {
        return await jwt.verify(token, this.jwt_secret)
    }

    async comparePassword(
        password1: string,
        password2: string
    ): Promise<boolean> {
        return bcrypt.compare(password1, password2)
    }
}
