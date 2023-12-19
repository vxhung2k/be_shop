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
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import UserCreateDto from './dto/user-create.dto';
import UserUpdateDto from './dto/user-update.dto';

@Controller('user')
@ApiTags('/BE/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'create user' })
  async createUser(@Body() user: UserCreateDto) {
    return await this.userService.createUser(user);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get user' })
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete user' })
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update user' })
  async updateUser(@Param('id') id: string, @Body() user: UserUpdateDto) {
    return await this.userService.updateUser(id, user);
  }
}
