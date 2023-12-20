import { UserEntity } from 'src/entity/index.entity'
import SignInDto from '../dto/signIn.dto'
import SignInResponseDto from '../dto/signIn.response.dto'

export interface IAuthService {
    validateUser(data: SignInDto): Promise<UserEntity | undefined>
    generateToken(user: UserEntity): Promise<string>
    generateRefreshToken(user: UserEntity): Promise<string>
    signIn(data: SignInDto): Promise<SignInResponseDto>
    // signOut(): Promise<any>
    // changePassword(): Promise<any>
    // forgotPassword(): Promise<any>
}
