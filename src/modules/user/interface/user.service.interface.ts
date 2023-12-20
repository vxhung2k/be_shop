import UserCreateDto from '../dto/user-create.dto'
import UserResponseDto from '../dto/user-response.dto'
import UserUpdateDto from '../dto/user-update.dto'

export interface IUserService {
    createUser(user: UserCreateDto): Promise<UserResponseDto>
    getUserById(id: string): Promise<UserResponseDto | undefined>
    updateUser(id: string, user: UserUpdateDto): Promise<UserResponseDto>
    deleteUser(id: string): Promise<any>
    getUserByEmail(email: string): Promise<UserResponseDto | undefined>
}
export default IUserService
