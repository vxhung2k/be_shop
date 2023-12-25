import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { ROLE_META_DATA_KEY } from 'src/modules/role/consts/const'
import { RoleGuard } from '../role-guard'

export function AuthRoleProtected(keyRole: string) {
    return applyDecorators(
        SetMetadata(ROLE_META_DATA_KEY, keyRole),
        UseGuards(RoleGuard)
    )
}
