import { UserEntity } from 'src/entity/index.entity'
import { RoleResponseDto } from './role.response.dto'

export class RoleCreateDto extends RoleResponseDto {
    user: UserEntity
}
