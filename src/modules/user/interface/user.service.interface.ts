import { UserEntity } from 'src/entity/index.entity'
import UserCreateDto from '../dto/user-create.dto'
import UserDeleteResponseDto from '../dto/user-delete.dto'
import UserResponseDto from '../dto/user-response.dto'
import UserUpdateDto from '../dto/user-update.dto'

export interface IUserService {
    createUser(user: UserCreateDto): Promise<UserResponseDto>
    getUserById(id: string): Promise<UserResponseDto | undefined>
    updateUser(id: string, user: UserUpdateDto): Promise<UserResponseDto>
    deleteUser(id: string): Promise<UserDeleteResponseDto>
    getUserByEmail(email: string): Promise<UserEntity | undefined>
}
export default IUserService
