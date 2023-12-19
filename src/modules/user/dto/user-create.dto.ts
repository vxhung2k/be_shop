import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { passwordRegex, phoneRegex } from 'src/helper/regex/regex';
import { GenderEnum, UserTypeEnum } from '../const/user.enum';
import { AvatarDto } from './avatar.dto';
import { Optional } from '@nestjs/common';

class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @Matches(passwordRegex)
  password: string;

  @Optional()
  @IsEnum(GenderEnum, { each: true })
  gender: GenderEnum;

  @Optional()
  @IsEnum(UserTypeEnum, { each: true })
  user_type: UserTypeEnum;

  @IsString()
  fullName: string;

  @IsString()
  fullAddress?: string;

  @IsString()
  @Matches(phoneRegex)
  phone: string;

  @IsArray()
  avatars?: AvatarDto[];
}
export default UserCreateDto;
