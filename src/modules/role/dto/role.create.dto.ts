import { UserEntity } from 'src/entity/index.entity'
import { RoleResponseDto } from './role.response.dto'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class RoleCreateDto {
    user: UserEntity

    @ApiProperty({ type: RoleResponseDto, isArray: true })
    @Type(() => RoleResponseDto)
    roles: RoleResponseDto[]
}
