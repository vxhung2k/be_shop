import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { UserEntity } from 'src/entity/index.entity'
import { UserService } from '../user/user.service'
import SignInDto from './dto/signIn.dto'
import SignInResponseDto from './dto/signIn.response.dto'
import { IAuthService } from './interface/auth.service.interface'
import { ResponseDto } from 'src/helper/common/response-dto/response.dto'
import { ChangePasswordDto } from './dto/changePassword.dto'
import { request } from 'express'
import { replace } from 'lodash'

@Injectable()
export class AuthService implements IAuthService {
    private readonly jwt_secret: string
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService
    ) {
        this.jwt_secret = this.configService.get<string>('JWT_SECRET')
    }

    async validateUser(data: SignInDto): Promise<UserEntity | undefined> {
        const { email, password } = data
        const user = await this.userService.getUserByEmail(email)
        if (!user) {
            return undefined
        }
        const { password: hashedPassword } = user
        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)
        if (isPasswordCorrect) {
            return user
        }
        return undefined
    }

    async generateToken(user: UserEntity): Promise<string> {
        const payload = {
            username: user.username,
            userId: user.id,
            user_type: user.user_type,
            exp: Math.floor(Date.now() / 1000) + +60 * 60 * 24,
        }
        return jwt.sign(payload, this.jwt_secret)
    }
    async generateRefreshToken(user: UserEntity): Promise<string> {
        const payload = {
            username: user.username,
            userId: user.id,
            user_type: user.user_type,
            exp: Math.floor(Date.now() / 1000) + +60 * 60 * 24 * 7,
        }
        return jwt.sign(payload, this.jwt_secret)
    }

    async signIn(data: SignInDto): Promise<SignInResponseDto> {
        try {
            const userCorrect = await this.validateUser(data)

            if (!userCorrect) {
                throw new HttpException('user not exist', HttpStatus.NOT_FOUND)
            }
            const token = await this.generateToken(userCorrect)
            const refreshToken = await this.generateRefreshToken(userCorrect)
            if (token && refreshToken) {
                const response: SignInResponseDto = {
                    token: token,
                    refresh_token: refreshToken,
                    message: 'sign in success',
                }
                return response
            }
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.EXPECTATION_FAILED
            )
        }
    }

    async changePassword(data: ChangePasswordDto): Promise<ResponseDto> {
        try {
            const { password, confirm_password } = data
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
                const user = await this.userService.getUserById(userId)
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.FAILED_DEPENDENCY)
        }
    }
}
