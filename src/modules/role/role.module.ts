import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleEntity } from 'src/entity/index.entity'
import { UserModule } from '../user/user.module'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'

@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity]), UserModule],
    controllers: [RoleController],
    providers: [RoleService],
    exports: [RoleService],
})
export class RoleModule {}
