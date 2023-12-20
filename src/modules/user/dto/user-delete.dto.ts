import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

class UserDeleteResponseDto {
    @ApiPropertyOptional()
    @IsString()
    message?: string

    @ApiPropertyOptional()
    @IsBoolean()
    success?: boolean
}
export default UserDeleteResponseDto
