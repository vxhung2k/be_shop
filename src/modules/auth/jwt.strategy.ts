import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from './auth.service'
import SignInDto from './dto/signIn.dto'
import { UserEntity } from 'src/entity/index.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super()
    }
    async validate(user: SignInDto): Promise<UserEntity> {
        const userGetted = await this.authService.validateUser(user)
        if (!userGetted) {
            throw new UnauthorizedException()
        }
        return userGetted
    }
}
