import { Module } from '@nestjs/common'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleEntity } from 'src/entity/index.entity'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity]), ConfigModule],
    controllers: [RoleController],
    providers: [RoleService],
    exports: [RoleService],
})
export class RoleModule {}
