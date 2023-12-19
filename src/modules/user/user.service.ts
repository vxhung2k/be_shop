import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import UserCreateDto from './dto/user-create.dto';
import UserResponseDto, {
  UserResponseCreateDto,
} from './dto/user-response.dto';
//import UserUpdateDto from './dto/user-update.dto';
import UserEntity from '../../entity/user.entity';
import IUserService from './interface/user.service.interface';
import AvatarEntity from 'src/entity/avatar.entity';
import * as bcrypt from 'bcrypt';
import { map, omit } from 'lodash';
import UserUpdateDto from './dto/user-update.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(AvatarEntity)
    private avatarRepository: Repository<AvatarEntity>,
  ) {}

  async createUser(user: UserCreateDto): Promise<UserResponseDto> {
    try {
      const userExits = await this.userRepository.findOneBy({
        email: user.email,
      });
      if (userExits) {
        throw new HttpException(
          'user with email is exist',
          HttpStatus.EXPECTATION_FAILED,
        );
      } else {
        const { avatars, password } = user;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userRepository.create({
          ...user,
          password: hashedPassword,
        });
        const savedUser = await this.userRepository.save(newUser);
        const newAvatars = map(avatars, (avatarDto) => {
          const avatar = this.avatarRepository.create({
            ...avatarDto,
            user: savedUser,
          });
          return avatar;
        });
        console.log(2, avatars);
        await this.avatarRepository
          .createQueryBuilder()
          .insert()
          .values(newAvatars)
          .execute();
        const updatedUser = await this.userRepository.findOne({
          where: { id: savedUser.id },
          relations: ['avatars'],
        });
        console.log(updatedUser);
        const userResponse: any = omit(updatedUser, ['username', 'password']);
        return userResponse;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.EXPECTATION_FAILED);
    }
  }
  async getUserById(id: string): Promise<UserResponseDto | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
        relations: ['avatars'],
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const userResponse: any = omit(user, ['username', 'password']);
      return userResponse;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
  async updateUser(id: string, user: UserUpdateDto): Promise<UserResponseDto> {
    try {
      const { avatars, ...rest } = user;
      const getUserById = await this.userRepository.findOne({
        where: { id: id },
        relations: ['avatars'],
      });
      if (!getUserById) {
        throw new NotFoundException('User not found');
      }
      await this.userRepository
        .createQueryBuilder()
        .update(UserEntity)
        .set(rest)
        .where('id = :id', { id: id })
        .execute();
      if (avatars) {
        for (const avatar of avatars) {
          await this.avatarRepository
            .createQueryBuilder()
            .update(AvatarEntity)
            .set({ url: avatar.url })
            .where('fileId = :fileId', { fileId: avatar.fileId })
            .execute();
        }
      }
      const userUpdated = await this.userRepository.findOne({
        where: { id: id },
        relations: ['avatars'],
      });
      const userResponse: any = omit(userUpdated, ['username', 'password']);
      return userResponse;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async deleteUser(id: string): Promise<UserResponseCreateDto> {
    try {
      const user = await this.userRepository.findOneBy({ id: id });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      await this.userRepository.remove(user);
      const response: UserResponseCreateDto = {
        message: 'delete user success',
        success: true,
      };
      return response;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
  async getUserByEmail(email: string): Promise<UserResponseDto | undefined> {
    const user = await this.userRepository.findOneBy({ email: email });
    if (user) {
      const userResponse = plainToClass(UserResponseDto, user, {
        excludeExtraneousValues: true,
      });
      return userResponse;
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
