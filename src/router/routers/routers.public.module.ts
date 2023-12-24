import { Module } from '@nestjs/common'
import { AuthModule } from 'src/modules/auth/auth.module'

@Module({
    controllers: [],
    providers: [],
    exports: [],
    imports: [AuthModule],
})
export class RoutesPublicModule {}
