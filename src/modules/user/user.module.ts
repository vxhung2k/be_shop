import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AvatarEntity, UserEntity } from 'src/entity/index.entity'
import { RoleEntity } from 'src/entity/role/role.entity'
import { RoleModule } from '../role/role.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, AvatarEntity, RoleEntity]),
        ConfigModule,
        RoleModule,
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
