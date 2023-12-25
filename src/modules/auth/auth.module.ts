import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { MailModule } from '../mail/mail.module'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { RoleModule } from '../role/role.module'

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        UserModule,
        MailModule,
        RoleModule,
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
