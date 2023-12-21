import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

export class ResponseDto {
    @ApiPropertyOptional({ example: 'message abcs' })
    @IsString()
    message: string

    @ApiPropertyOptional({ example: true })
    @IsBoolean()
    public success: string
}
