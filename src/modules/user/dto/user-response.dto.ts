import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { GenderEnum, UserTypeEnum } from '../const/user.enum';
import { phoneRegex } from 'src/helper/regex/regex';
import { AvatarDto } from './avatar.dto';

export class UserResponseCreateDto {
  message?: string;
  success?: boolean;
  payload?: any;
}
class UserResponseDto {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsEnum({ enum: GenderEnum })
  gender: GenderEnum;

  @IsEnum({ type: 'enum', enum: UserTypeEnum })
  @IsNotEmpty()
  user_type: UserTypeEnum;

  @IsString()
  fullName: string;

  @IsString()
  fullAddress: string;

  @IsString()
  @Matches(phoneRegex)
  phone: string;

  @IsArray()
  avatars?: AvatarDto[];

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
export default UserResponseDto;
