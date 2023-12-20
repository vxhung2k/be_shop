import {
    IsArray,
    IsEnum,
    IsOptional,
    IsString,
    Matches,
    ValidateNested,
} from 'class-validator'
import { phoneRegex } from 'src/helper/regex/regex'
import { GenderEnum, UserTypeEnum } from '../const/user.enum'
import AvatarDto from './avatar.dto'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'

class UserUpdateDto {
    @ApiPropertyOptional({ enum: GenderEnum, enumName: 'Gender' })
    @IsEnum(GenderEnum, { message: 'Gender not match GenderEnum' })
    @IsOptional()
    gender?: string

    @ApiPropertyOptional({ enum: UserTypeEnum, enumName: 'User_type' })
    @IsEnum(UserTypeEnum, { message: 'User_type not match UserTypeEnum' })
    @IsOptional()
    user_type?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    fullName?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    fullAddress?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @Matches(phoneRegex)
    phone?: string

    @ApiPropertyOptional({ type: () => AvatarDto, isArray: true })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AvatarDto)
    @IsOptional()
    avatars?: AvatarDto[]
}
export default UserUpdateDto
