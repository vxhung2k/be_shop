import { ApiPropertyOptional } from '@nestjs/swagger'
import UserResponseDto from './user-response.dto'
import { IsArray, IsNumber, IsObject, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class ResponseListUserDto {
    @ApiPropertyOptional({ name: 'totalData', example: 50 })
    @IsNumber()
    totalData: number

    @ApiPropertyOptional({ name: 'totalPage', example: 50 })
    @IsNumber()
    totalPage?: number

    @ApiPropertyOptional({ name: 'currentPage', example: 50 })
    @IsNumber()
    currentPage?: number

    @ApiPropertyOptional({ name: 'perPage', example: 50 })
    @IsNumber()
    perPage?: number

    @ApiPropertyOptional({
        name: '_availableSearch',
        example: ['column1', 'column2', 'cloumn3'],
    })
    @IsArray()
    _availableSearch?: string[]

    @ApiPropertyOptional({
        name: '_availableSort',
        example: ['column1', 'column2', 'cloumn3'],
    })
    @IsArray()
    _availableSort?: string[]
    @IsObject()
    @ApiPropertyOptional({
        name: '_metadata',
        example: {
            nextPage: '/api/user?perPage=5&page=2&gender=male&sort=fullName',
            firstPage: '/api/user?perPage=5&page=1&gender=male&sort=fullName',
            lastPage: '/api/user?perPage=5&page=3&gender=male&sort=fullName',
            path: '/api/user',
            timezone: 'Asia/Saigon',
        },
    })
    @IsArray()
    _metadata?: any[]

    @ApiPropertyOptional({
        name: 'data-response',
        type: UserResponseDto,
        isArray: true,
    })
    @Type(() => UserResponseDto)
    @ValidateNested({ each: true })
    @IsArray()
    data: UserResponseDto[]
}
