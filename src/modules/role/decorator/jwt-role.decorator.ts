import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { RoleAdmin } from '../role-admin'

export function AuthRoleProtected(keyRole: string) {
    return applyDecorators(
        SetMetadata('keyRole', keyRole),
        UseGuards(RoleAdmin)
    )
}
