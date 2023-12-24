import { Global, Module } from '@nestjs/common'
import { HelperEncryptService } from './service/helper.encryption.service'
import { HelperDateTimeService } from './service/helper.datetime.service'

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [HelperEncryptService, HelperDateTimeService],
    exports: [HelperEncryptService, HelperDateTimeService],
})
export class HelperModule {}
