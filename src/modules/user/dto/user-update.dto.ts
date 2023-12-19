import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { phoneRegex } from 'src/helper/regex/regex';
import { GenderEnum, UserTypeEnum } from '../const/user.enum';
import { AvatarDto } from './avatar.dto';

class UserUpdateDto {
  @IsEnum({ enum: GenderEnum })
  @IsOptional()
  gender?: GenderEnum;

  @IsEnum({ enum: UserTypeEnum })
  @IsOptional()
  user_type?: UserTypeEnum;

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  fullAddress?: string;

  @IsString()
  @IsOptional()
  @Matches(phoneRegex)
  phone?: string;

  @IsArray()
  @IsOptional()
  avatars?: AvatarDto[];
}
export default UserUpdateDto;
