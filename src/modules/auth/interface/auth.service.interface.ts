import { UserEntity } from 'src/entity/index.entity'
import SignInDto from '../dto/signIn.dto'
import SignInResponseDto from '../dto/signIn.response.dto'
import { ChangePasswordDto } from '../dto/changePassword.dto'
import { ResponseDto } from 'src/helper/common/response-dto/response.dto'

export interface IAuthService {
    validateUser(data: SignInDto): Promise<UserEntity | undefined>
    generateToken(user: UserEntity): Promise<string>
    generateRefreshToken(user: UserEntity): Promise<string>
    signIn(data: SignInDto): Promise<SignInResponseDto>
    changePassword(data: ChangePasswordDto): Promise<ResponseDto>
    // forgotPassword(): Promise<any>
}
