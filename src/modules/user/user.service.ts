import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { map, omit } from 'lodash'
import { AvatarEntity, UserEntity } from 'src/entity/index.entity'
import { HelperEncryptService } from 'src/helper/service/helper.encryption.service'
import { Repository } from 'typeorm'
import UserCreateDto from './dto/user-create.dto'
import UserDeleteResponseDto from './dto/user-delete.dto'
import UserResponseDto from './dto/user-response.dto'
import UserUpdateDto from './dto/user-update.dto'
import IUserService from './interface/user.service.interface'

@Injectable()
export class UserService implements IUserService {
    private readonly jwt_secret: string
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,

        @InjectRepository(AvatarEntity)
        private avatarRepository: Repository<AvatarEntity>,
        private readonly configService: ConfigService,
        private readonly helperEncryptionService: HelperEncryptService
    ) {
        this.jwt_secret = this.configService.get<string>('JWT_SECRET')
    }

    async createUser(user: UserCreateDto): Promise<any> {
        try {
            const userExits = await this.userRepository.findOneBy({
                email: user.email,
            })
            if (userExits) {
                throw new HttpException(
                    'user with email is exist',
                    HttpStatus.EXPECTATION_FAILED
                )
            } else {
                const { avatars, password } = user
                const hashedPassword =
                    await this.helperEncryptionService.hashPassword(password)
                const newUser = await this.userRepository.create({
                    ...user,
                    password: hashedPassword,
                })
                const savedUser = await this.userRepository.save(newUser)
                await Promise.all(
                    map(avatars, async (avatarDto) => {
                        const avatar = await this.avatarRepository.create({
                            ...avatarDto,
                            user: savedUser,
                        })
                        await this.avatarRepository.save(avatar)
                        return avatar
                    })
                )
                const updatedUser = await this.userRepository.findOne({
                    where: { id: savedUser.id },
                    relations: ['avatars'],
                })

                const userResponse: any = omit(updatedUser, [
                    'username',
                    'password',
                ])
                return userResponse
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.EXPECTATION_FAILED)
        }
    }

    async getUserById(id: string): Promise<UserResponseDto | undefined> {
        try {
            const user = await this.userRepository.findOne({
                where: { id: id },
                relations: ['avatars'],
            })
            if (!user) {
                throw new NotFoundException('User not found')
            }
            const userResponse: any = omit(user, ['username', 'password'])
            return userResponse
        } catch (error) {
            throw new HttpException(error, 500)
        }
    }

    async updateUser(
        id: string,
        user: UserUpdateDto
    ): Promise<UserResponseDto> {
        try {
            const { avatars, ...rest } = user
            const getUserById = await this.userRepository.findOne({
                where: { id: id },
                relations: ['avatars'],
            })
            if (!getUserById) {
                throw new NotFoundException('User not found')
            }
            await this.userRepository
                .createQueryBuilder()
                .update(UserEntity)
                .set(rest)
                .where('id = :id', { id: id })
                .execute()
            if (avatars) {
                for (const avatar of avatars) {
                    await this.avatarRepository
                        .createQueryBuilder()
                        .update(AvatarEntity)
                        .set({ url: avatar.url })
                        .where('fileId = :fileId', { fileId: avatar.fileId })
                        .execute()
                }
            }
            const userUpdated = await this.userRepository.findOne({
                where: { id: id },
                relations: ['avatars'],
            })
            const userResponse: any = omit(userUpdated, [
                'username',
                'password',
            ])
            return userResponse
        } catch (error) {
            throw new HttpException(error, 500)
        }
    }

    async deleteUser(id: string): Promise<UserDeleteResponseDto> {
        try {
            const user = await this.userRepository.findOneBy({ id: id })
            if (!user) {
                throw new NotFoundException('User not found')
            }
            await this.userRepository.remove(user)
            const response = {
                message: 'delete user success',
                success: true,
            }
            return response
        } catch (error) {
            throw new HttpException(error, 500)
        }
    }

    async getUserByEmail(email: string): Promise<UserEntity | undefined> {
        const user = await this.userRepository.findOneBy({ email: email })
        if (user) {
            return user
        } else {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
    }

    async updatePassword(userId: string, password: string): Promise<boolean> {
        const dataUpdate = { password: password }
        const userUpdate = await this.userRepository
            .createQueryBuilder()
            .update(UserEntity)
            .set(dataUpdate)
            .where('id = :id', { id: userId })
            .execute()
        return !!userUpdate
    }

    async getAllUser(
        filters?: Record<string, any>,
        sorts?: Record<string, any>,
        limit?: number,
        offset?: number
    ): Promise<UserResponseDto[]> {
        const users = await this.userRepository.find({
            where: { ...filters },
            order: { ...sorts },
            relations: ['avatars'],
            take: limit,
            skip: offset,
        })
        const response = map(users, (user) => {
            return omit(user, ['username', 'password'])
        })
        return response
    }
}
