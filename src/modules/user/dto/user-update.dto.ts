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
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

class UserUpdateDto {
    @ApiPropertyOptional({ enum: GenderEnum, enumName: 'Gender' })
    @IsEnum({ enum: GenderEnum })
    @IsOptional()
    gender?: GenderEnum

    @ApiPropertyOptional({ enum: UserTypeEnum, enumName: 'User_type' })
    @IsEnum({ enum: UserTypeEnum })
    @IsOptional()
    user_type?: UserTypeEnum

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
