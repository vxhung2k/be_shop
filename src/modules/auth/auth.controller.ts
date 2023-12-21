import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import SignInDto from './dto/signIn.dto'
import SignInResponseDto from './dto/signIn.response.dto'

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
}
