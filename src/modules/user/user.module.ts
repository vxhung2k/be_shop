import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AvatarEntity, UserEntity } from 'src/entity/index.entity'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, AvatarEntity])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
