import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from './database/database'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'

@Module({
    imports: [
        // ConfigModule.forRoot({
        //     validationSchema: Joi.object({
        //         POSTGRES_HOST: Joi.string().required(),
        //         POSTGRES_PORT: Joi.number().required(),
        //         POSTGRES_USER: Joi.string().required(),
        //         POSTGRES_PASSWORD: Joi.string().required(),
        //         POSTGRES_DB: Joi.string().required(),
        //         PORT: Joi.number(),
        //     }),
        // }),
        // DatabaseModule,
        TypeOrmModule.forRoot(dataSourceOptions),
        UserModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
