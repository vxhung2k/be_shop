import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'
import UserCreateDto from './dto/user-create.dto'
import UserUpdateDto from './dto/user-update.dto'
import UserResponseDto from './dto/user-response.dto'
import UserDeleteResponseDto from './dto/user-delete.dto'
import { AuthAccessProtected } from '../auth/decorator/jwt-auth.decorator'

@ApiTags('/BE/user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'create user' })
    async createUser(@Body() user: UserCreateDto) {
        return await this.userService.createUser(user)
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'get user' })
    @ApiResponse({
        status: 200,
        description: 'Return user',
        type: [UserResponseDto],
    })
    @AuthAccessProtected()
    async getUserById(@Param('id') id: string) {
        return await this.userService.getUserById(id)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'delete user' })
    @ApiResponse({
        status: 200,
        description: 'delete user',
        type: [UserDeleteResponseDto],
    })
    async deleteUser(@Param('id') id: string) {
        return await this.userService.deleteUser(id)
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'update user' })
    @ApiResponse({
        status: 200,
        description: 'delete user',
        type: [UserResponseDto],
    })
    async updateUser(@Param('id') id: string, @Body() user: UserUpdateDto) {
        return await this.userService.updateUser(id, user)
    }
}
