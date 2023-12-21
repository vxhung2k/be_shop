import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import { request } from 'express'
import * as jwt from 'jsonwebtoken'
import { isEqual, replace } from 'lodash'
import { UserEntity } from 'src/entity/index.entity'
import { ResponseDto } from 'src/helper/common/response-dto/response.dto'
import { UserService } from '../user/user.service'
import {
    ChangePasswordDto,
    EmailDto,
    PasswordDto,
} from './dto/changePassword.dto'
import SignInDto from './dto/signIn.dto'
import SignInResponseDto from './dto/signIn.response.dto'
import { IAuthService } from './interface/auth.service.interface'
import { MailService } from '../mail/mail.service'

@Injectable()
export class AuthService implements IAuthService {
    private readonly jwt_secret: string
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly mailService: MailService
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
            const { old_password, new_password, confirm_password } = data
            const { headers } = request
            const { authorization } = headers
            const accessToken = replace(authorization, 'Bearer', '').trim()
            const decoded = await jwt.verify(accessToken, this.jwt_secret)
            const { userId } = decoded
            const user = await this.userService.getUserById(userId)
            const data_valid = { email: user.email, password: old_password }
            const userCorrect = await this.validateUser(data_valid)
            if (!userCorrect) {
                throw new HttpException(
                    'password not valid',
                    HttpStatus.BAD_REQUEST
                )
            }
            if (!isEqual(new_password, confirm_password)) {
                throw new HttpException(
                    'new_password not match confirm_password',
                    HttpStatus.BAD_REQUEST
                )
            }
            const hashedPassword = await bcrypt.hash(new_password, 10)
            const userUpdate = await this.userService.updatePassword(
                user.id,
                hashedPassword
            )
            const response = !!userUpdate
                ? { message: 'change password success', success: true }
                : { message: 'change password fail', success: false }
            return response
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.FAILED_DEPENDENCY)
        }
    }

    async sendMailResetPassword(email: EmailDto) {
        const { headers } = request
        const { authorization } = headers
        const accessToken = replace(authorization, 'Bearer', '').trim()
        const user = await this.userService.getUserByEmail(email.email)
        if (!user) {
            throw new HttpException('user not found', HttpStatus.NOT_FOUND)
        }
        const { email: mailTo, fullName } = user
        await this.mailService.sendMailConfirmation(
            mailTo,
            fullName,
            accessToken
        )
    }
    async resetPassword(
        token: string,
        password: PasswordDto
    ): Promise<ResponseDto> {
        const decoded = await jwt.verify(token, this.jwt_secret)
        if (!decoded) {
            throw new UnauthorizedException()
        }
        const { userId } = decoded

        const hashedPassword = await bcrypt.hash(password.password, 10)
        const isUpdated = await this.userService.updatePassword(
            userId,
            hashedPassword
        )
        return isUpdated
            ? { message: 'reset password success', success: true }
            : { message: 'reset password fail', success: false }
    }
}
