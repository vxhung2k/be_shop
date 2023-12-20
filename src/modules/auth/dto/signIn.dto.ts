import { ApiProperty } from '@nestjs/swagger'
import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator'
import { passwordRegex } from 'src/helper/regex/regex'

class SignInDto {
    @ApiProperty({ required: true, example: 'xxx@gmail.com' })
    @IsEmail()
    email: string

    @ApiProperty({ required: true, example: 'admin@123' })
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(passwordRegex)
    password: string
}
export default SignInDto
