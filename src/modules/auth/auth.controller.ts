import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import SignInDto from './dto/signIn.dto'
import SignInResponseDto from './dto/signIn.response.dto'
import { ResponseDto } from 'src/helper/response-dto/response.dto'
import { ChangePasswordDto, EmailDto } from './dto/changePassword.dto'
import { AuthAccessProtected } from './decorator/jwt-auth.decorator'

@ApiTags('/BE/auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signIn')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'sign in' })
    @ApiResponse({
        status: 200,
        description: 'Return user',
        type: [SignInResponseDto],
    })
    async signIn(@Body() data: SignInDto) {
        return await this.authService.signIn(data)
    }

    @Post('change-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'change password' })
    @AuthAccessProtected()
    @ApiResponse({
        status: 200,
        description: 'change password',
        type: [ResponseDto],
    })
    async changePassword(@Body() data: ChangePasswordDto) {
        return await this.authService.changePassword(data)
    }

    @Post('send-mail-reset-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'send mail reset password' })
    async sendMailResetPassword(@Body() email: EmailDto) {
        return await this.authService.sendMailResetPassword(email)
    }

    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'reset password' })
    @AuthAccessProtected()
    @ApiResponse({
        status: 200,
        type: [ResponseDto],
    })
    async resetPassword(
        @Body() password: string,
        @Param('token') token: string
    ) {
        const passwordObject = { password: password }
        return await this.authService.resetPassword(token, passwordObject)
    }
}
