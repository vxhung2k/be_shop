import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RoleService } from './role.service'
import { AuthAccessProtected } from '../auth/decorator/jwt-auth.decorator'
import { RoleResponseCreateDto, RoleResponseDto } from './dto/role.response.dto'
import { RoleCreateDto } from './dto/role.create.dto'

@Controller('role')
@ApiTags('BE/Role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @AuthAccessProtected()
    @ApiOperation({ summary: 'update user' })
    @ApiResponse({
        status: 200,
        description: 'get roles',
        type: [RoleResponseDto],
    })
    async getAllRoleByUserId(
        @Param() id: string
    ): Promise<RoleResponseDto[] | undefined> {
        return await this.roleService.getAllRoleByUserId(id)
    }

    @Post(':id')
    @HttpCode(HttpStatus.OK)
    @AuthAccessProtected()
    @ApiOperation({ summary: 'create roles for user' })
    @ApiResponse({
        status: 200,
        description: 'create roles for user',
        type: [RoleResponseCreateDto],
    })
    async addRoleForUser(
        @Param() id: string,
        @Body() data: RoleCreateDto[]
    ): Promise<RoleResponseCreateDto> {
        return await this.roleService.addRoleForUser(id, data)
    }
}
