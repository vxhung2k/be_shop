import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from 'src/entity/user.entity';
import AvatarEntity from 'src/entity/avatar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AvatarEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
