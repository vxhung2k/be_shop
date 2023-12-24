import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsString, ValidateNested } from 'class-validator'

export class RoleResponseDto {
    @ApiProperty({ required: true, example: 'add-user' })
    @IsString()
    key: string

    @ApiProperty({ required: true, example: 'Them user' })
    @IsString()
    name: string
}

export class RoleResponseCreateDto {
    @ApiProperty({
        required: true,
        example: '05600d25-df60-463b-be13-009ecb874525',
    })
    @IsString()
    userId: string

    @ApiPropertyOptional({ type: RoleResponseDto, isArray: true })
    @IsArray()
    @Type(() => RoleResponseDto)
    @ValidateNested({ each: true })
    roles: RoleResponseDto[]
}
