import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { IRoleService } from './interface/role.service.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RoleEntity } from 'src/entity/index.entity'
import { RoleResponseCreateDto, RoleResponseDto } from './dto/role.response.dto'
import { isEmpty, map, omit, replace } from 'lodash'
import { RoleCreateDto } from './dto/role.create.dto'
import { UserService } from '../user/user.service'
import { request } from 'express'
import { HelperEncryptService } from 'src/helper/service/helper.encryption.service'

@Injectable()
export class RoleService implements IRoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
        private readonly userService: UserService,
        private readonly helperEncryptionService: HelperEncryptService
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

    async addRoleForUser(
        userId: string,
        data: RoleCreateDto[]
    ): Promise<RoleResponseCreateDto> {
        try {
            const user = await this.userService.getUserById(userId)
            if (user && !isEmpty(data)) {
                const roles = await Promise.all(
                    map(data, async (roleDto) => {
                        const role = await this.roleRepository.create({
                            ...roleDto,
                            user: user,
                        })
                        await this.roleRepository.save(role)
                        return omit(role, ['user', 'id'])
                    })
                )
                if (roles) {
                    const response = {
                        userId: userId,
                        roles: roles,
                    }
                    return response
                }
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getUserRoles(): Promise<RoleResponseDto[] | undefined> {
        const { headers } = request
        const { authorization } = headers
        const accessToken = authorization
            ? replace(authorization, 'Bearer', '').trim()
            : undefined
        if (!accessToken) {
            throw new UnauthorizedException({
                statusCode: 500,
                message: 'not authorization',
            })
        }

        const decoded =
            await this.helperEncryptionService.jwtVerifyAccessToken(accessToken)
        if (decoded) {
            const { userId } = decoded
            return await this.getAllRoleByUserId(userId)
        }
    }
}
