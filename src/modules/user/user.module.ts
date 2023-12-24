import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AvatarEntity, UserEntity } from 'src/entity/index.entity'
import { RoleEntity } from 'src/entity/role/role.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, AvatarEntity, RoleEntity])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
