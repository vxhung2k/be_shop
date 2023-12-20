import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AvatarEntity, UserEntity } from 'src/entity/index.entity'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, AvatarEntity]),
        ConfigModule,
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
