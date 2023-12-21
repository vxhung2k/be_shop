import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, Matches } from 'class-validator'
import { passwordRegex } from 'src/helper/regex/regex'

export class ChangePasswordDto {
    @ApiProperty({ required: true, example: '123455@aA' })
    @Matches(passwordRegex)
    public old_password: string

    @ApiProperty({ required: true, example: '123455@aA' })
    @Matches(passwordRegex)
    public new_password: string

    @ApiProperty({ required: true, example: '123455@aA' })
    @Matches(passwordRegex)
    public confirm_password: string
}

export class EmailDto {
    @ApiProperty({ required: true, example: 'xxx@gmail.com' })
    @IsEmail()
    public email: string
}

export class PasswordDto {
    @ApiProperty({ required: true, example: 'xxx@gmail.com' })
    @Matches(passwordRegex)
    public password: string
}
