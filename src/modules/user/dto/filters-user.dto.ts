import { Optional } from '@nestjs/common'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsDate, IsEnum, Matches } from 'class-validator'
import { GenderEnum, UserTypeEnum } from '../const/user.enum'
import { phoneRegex } from 'src/helper/regex/regex'

export class FilterUserDto {
    @ApiPropertyOptional({ example: 'male' })
    @Optional()
    @IsEnum(GenderEnum, { each: true })
    public gender?: string

    @ApiPropertyOptional({ example: 'admin' })
    @Optional()
    @IsEnum(UserTypeEnum, { each: true })
    public user_type?: string

    @ApiPropertyOptional({ example: 'fullName' })
    @Optional()
    public fullName?: string

    @ApiPropertyOptional({ example: '71,hoangngocphach' })
    @Optional()
    public fullAddress?: string

    @ApiPropertyOptional({ example: '0988551630' })
    @Optional()
    @Matches(phoneRegex)
    public phone?: string

    @ApiPropertyOptional({ example: new Date() })
    @Optional()
    @IsDate()
    createdAt?: string

    @ApiPropertyOptional({ example: new Date() })
    @Optional()
    @IsDate()
    updatedAt?: string
}
