import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class RoleResponseDto {
    @ApiProperty({ required: true, example: 'add-user' })
    @IsString()
    key: string

    @ApiProperty({ required: true, example: 'Them user' })
    @IsString()
    name: string
}
