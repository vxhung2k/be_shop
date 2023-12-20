import {
    IsArray,
    IsDate,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    ValidateNested,
} from 'class-validator'
import { GenderEnum, UserTypeEnum } from '../const/user.enum'
import { phoneRegex } from 'src/helper/regex/regex'
import AvatarDto from './avatar.dto'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'

class UserResponseDto {
    @ApiProperty()
    @IsString()
    id: string

    @ApiProperty()
    @IsEmail()
    email: string

    @ApiPropertyOptional({ enum: GenderEnum, enumName: 'Gender' })
    @IsEnum(GenderEnum)
    @IsOptional()
    gender?: GenderEnum

    @ApiProperty({ enum: UserTypeEnum, enumName: 'User_type' })
    @IsEnum(UserTypeEnum)
    @IsNotEmpty()
    user_type: UserTypeEnum

    @ApiProperty()
    @IsString()
    fullName: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
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

    @ApiPropertyOptional()
    @IsDate()
    createdAt?: Date

    @ApiPropertyOptional()
    @IsDate()
    updatedAt?: Date
}
export default UserResponseDto
