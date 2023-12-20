import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

class SignInResponseDto {
    @ApiProperty({ required: true })
    @IsString()
    token: string

    @ApiProperty({ required: true })
    @IsString()
    refresh_token: string

    @ApiProperty()
    @IsString()
    message: string
}
export default SignInResponseDto
