import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from '../user/user.module'
import { MailModule } from '../mail/mail.module'

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        ConfigModule,
        UserModule,
        MailModule,
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
