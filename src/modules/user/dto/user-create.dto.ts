import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    ValidateNested,
} from 'class-validator'
import { passwordRegex, phoneRegex } from 'src/helper/regex/regex'
import { GenderEnum, UserTypeEnum } from '../const/user.enum'
import AvatarDto from './avatar.dto'
import { Optional } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'

class UserCreateDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string

    @ApiProperty()
    @IsNotEmpty()
    @Matches(passwordRegex)
    password: string

    @ApiPropertyOptional({ enum: GenderEnum, enumName: 'Gender' })
    @Optional()
    @IsEnum(GenderEnum, { each: true })
    gender: string

    @ApiProperty({ enum: UserTypeEnum, enumName: 'User_type' })
    @Optional()
    @IsEnum(UserTypeEnum, { each: true })
    user_type: string

    @ApiPropertyOptional()
    @IsString()
    fullName: string

    @ApiPropertyOptional()
    @IsString()
    fullAddress?: string

    @ApiPropertyOptional()
    @IsString()
    @Matches(phoneRegex)
    phone: string

    @ApiPropertyOptional({ type: () => AvatarDto, isArray: true })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AvatarDto)
    @IsOptional()
    avatars?: AvatarDto[]
}
export default UserCreateDto
