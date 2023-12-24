import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommonModule } from './common/common.module'
import { dataSourceOptions } from './database/database'
import { RouterModule } from './router/router.module'
import { HelperModule } from './helper/helper.module'

@Module({
    imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        RouterModule.forRoot(),
        ConfigModule.forRoot({ isGlobal: true }),
        CommonModule,
        HelperModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
