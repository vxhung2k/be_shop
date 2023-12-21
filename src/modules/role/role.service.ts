import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { IRoleService } from './interface/role.service.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RoleEntity } from 'src/entity/index.entity'
import { RoleResponseDto } from './dto/role.response.dto'
import { map, omit } from 'lodash'

@Injectable()
export class RoleService implements IRoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>
    ) {}

    async getAllRoleByUserId(
        userId: string
    ): Promise<RoleResponseDto[] | undefined> {
        const roles: RoleEntity[] = await this.roleRepository
            .createQueryBuilder('role')
            .where('role.userId="userId', { userId })
            .execute()

        if (!roles) {
            throw new HttpException('role not found', HttpStatus.NOT_FOUND)
        }
        const response = map(roles, (role) => omit(role, ['id', 'user']))
        return response
    }
}
