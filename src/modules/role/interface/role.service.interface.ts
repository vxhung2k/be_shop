import { RoleResponseDto } from '../dto/role.response.dto'

export interface IRoleService {
    getAllRoleByUserId(userId: string): Promise<RoleResponseDto[] | undefined>
}
