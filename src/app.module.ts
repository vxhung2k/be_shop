import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from './database/database'
import { AuthModule } from './modules/auth/auth.module'
import { MailModule } from './modules/mail/mail.module'
import { RoleModule } from './modules/role/role.module'
import { UserModule } from './modules/user/user.module'

@Module({
    imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        UserModule,
        AuthModule,
        RoleModule,
        MailModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
