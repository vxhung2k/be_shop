import {
    RoleResponseCreateDto,
    RoleResponseDto,
} from '../dto/role.response.dto'

export interface IRoleService {
    getAllRoleByUserId(userId: string): Promise<RoleResponseDto[] | undefined>
    getUserRoles(): Promise<RoleResponseDto[] | undefined>
    addRoleForUser(
        userId: string,
        data: RoleResponseDto[]
    ): Promise<RoleResponseCreateDto>
}
