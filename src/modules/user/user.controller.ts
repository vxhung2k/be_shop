import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { size, toNumber } from 'lodash'
import { SORT_AVAILABLE } from 'src/common/filter/const/sort.const'
import { FilterDateTimeRangeDecorator } from 'src/common/filter/decorators/filter.date.decorator'
import { FilterEnumDecorator } from 'src/common/filter/decorators/filter.enum.decorator'
import { FilterStringDecorator } from 'src/common/filter/decorators/filter.string.decorator'
import { SearchStringDecorator } from 'src/common/filter/decorators/search-string.decorator'
import { SortDecorator } from 'src/common/filter/decorators/sort.decorator'
import { PaginationService } from 'src/common/pagination/pagination.service'
import { ResponsePagination } from 'src/common/response/decorator/response.decorator'
import { IResponsePaging } from 'src/common/response/interface/response-paging.interface'
import { AuthAccessProtected } from '../auth/decorator/jwt-auth.decorator'
import { AVAILABLE_SEARCH_USER } from './const/available-search.const'
import { GenderEnum, UserTypeEnum } from './const/user.enum'
import { ResponseListUserDto } from './dto/response-list-user.dto'
import UserCreateDto from './dto/user-create.dto'
import UserDeleteResponseDto from './dto/user-delete.dto'
import UserResponseDto from './dto/user-response.dto'
import UserUpdateDto from './dto/user-update.dto'
import { UserService } from './user.service'

@ApiTags('/BE/user')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly paginationService: PaginationService
    ) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @AuthAccessProtected()
    @ApiOperation({ summary: 'create user' })
    @ApiResponse({
        status: 200,
        description: 'detail user',
        type: [UserResponseDto],
    })
    async createUser(@Body() user: UserCreateDto) {
        return await this.userService.createUser(user)
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'get user' })
    @ApiResponse({
        status: 200,
        description: 'detail user',
        type: [UserResponseDto],
    })
    @AuthAccessProtected()
    // @AuthRoleProtected('view-user')
    async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
        return await this.userService.getUserById(id)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @AuthAccessProtected()
    @ApiOperation({ summary: 'delete user' })
    @ApiResponse({
        status: 200,
        description: 'delete user',
        type: [UserDeleteResponseDto],
    })
    async deleteUser(@Param('id') id: string): Promise<UserDeleteResponseDto> {
        return await this.userService.deleteUser(id)
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @AuthAccessProtected()
    @ApiOperation({ summary: 'update user' })
    @ApiResponse({
        status: 200,
        description: 'delete user',
        type: [UserResponseDto],
    })
    async updateUser(
        @Param('id') id: string,
        @Body() user: UserUpdateDto
    ): Promise<UserResponseDto> {
        return await this.userService.updateUser(id, user)
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @AuthAccessProtected()
    @ApiOperation({ summary: 'get list user' })
    @ApiResponse({
        status: 200,
        description: 'get List User user',
        type: [ResponseListUserDto],
    })
    @ResponsePagination({
        message: 'get list user success',
        serialization: UserResponseDto,
    })
    @ApiQuery({ name: 'search', example: 'ahuhu', required: false })
    @ApiQuery({
        name: 'fullName',
        example: 'Nguyễn Văn A',
        required: false,
    })
    @ApiQuery({
        name: 'gender',
        example: 'male',
        required: false,
    })
    @ApiQuery({
        name: 'user_type',
        example: 'admin',
        required: false,
    })
    @ApiQuery({
        name: 'phone',
        example: '0988661523',
        required: false,
    })
    @ApiQuery({
        name: 'fullAddress',
        example: '71A,Hoang hà,..',
        required: false,
    })
    @ApiQuery({
        name: 'createdAt',
        example: '2023-12-24T13:40:21.947Z_2023-12-24T13:40:21.947Z',
        required: false,
    })
    @ApiQuery({
        name: 'updatedAt',
        example: '2023-12-24T13:40:21.947Z_2023-12-24T13:40:21.947Z',
        required: false,
    })
    @ApiQuery({
        name: 'sort',
        example: ['column1', '-column2'],
        required: false,
    })
    async users(
        @SearchStringDecorator('search', AVAILABLE_SEARCH_USER)
        search: Record<string, any>,
        @FilterStringDecorator('fullName') fullName: Record<string, any>,
        @FilterEnumDecorator('gender', 'male', GenderEnum as any)
        gender: Record<string, any>,
        @FilterEnumDecorator('user_type', 'admin', UserTypeEnum as any)
        user_type: Record<string, any>,
        @FilterStringDecorator('phone') phone: Record<string, any>,
        @FilterStringDecorator('fullAddress') fullAddress: Record<string, any>,
        @FilterDateTimeRangeDecorator('createdAt')
        createdAt: Record<string, any>,
        @FilterDateTimeRangeDecorator('updatedAt')
        updatedAt: Record<string, any>,
        @SortDecorator('sort', SORT_AVAILABLE) sort: Record<string, any>,
        @Query('page')
        page?: string,
        @Query('perPage') perPage?: string
    ): Promise<IResponsePaging> {
        try {
            const filters = {
                ...search,
                ...fullName,
                ...gender,
                ...user_type,
                ...phone,
                ...fullAddress,
                ...createdAt,
                ...updatedAt,
            }
            const users = await this.userService.getAllUser(filters)
            const totalData = size(users)
            const _currentPage = await this.paginationService.getPage(
                toNumber(page)
            )
            const _perPage = await this.paginationService.getPerPage(
                toNumber(perPage)
            )
            const _offset = await this.paginationService.getOffset(
                _currentPage,
                _perPage
            )
            const totalPage = await this.paginationService.getTotalPage(
                totalData,
                _perPage
            )
            const usersPerPage = await this.userService.getAllUser(
                filters,
                sort,
                _perPage,
                _offset
            )

            return {
                totalData,
                totalPage,
                currentPage: _currentPage,
                perPage: _perPage,
                _availableSearch: AVAILABLE_SEARCH_USER,
                _availableSort: SORT_AVAILABLE,
                data: usersPerPage,
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_GATEWAY)
        }
    }
}
