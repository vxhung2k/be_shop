import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsString } from 'class-validator'

class AvatarDto {
    @ApiPropertyOptional()
    @IsString()
    url: string

    @ApiPropertyOptional()
    @IsString()
    fileId: string
}
export default AvatarDto
