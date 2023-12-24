import { Global, Module } from '@nestjs/common'
import { ResponseModule } from './response/response.module'
import { PaginationModule } from './pagination/pagination.module'
import { FilterModule } from './filter/filter.module'

@Global()
@Module({
    imports: [ResponseModule, PaginationModule, FilterModule],
    controllers: [],
    providers: [],
    exports: [ResponseModule, PaginationModule, FilterModule],
})
export class CommonModule {}
