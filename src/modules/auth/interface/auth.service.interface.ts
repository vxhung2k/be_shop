import { UserEntity } from 'src/entity/index.entity'
import SignInDto from '../dto/signIn.dto'
import SignInResponseDto from '../dto/signIn.response.dto'
import {
    ChangePasswordDto,
    EmailDto,
    PasswordDto,
} from '../dto/changePassword.dto'
import { ResponseDto } from 'src/helper/response-dto/response.dto'

export interface IAuthService {
    validateUser(data: SignInDto): Promise<UserEntity | undefined>
    signIn(data: SignInDto): Promise<SignInResponseDto>
    changePassword(data: ChangePasswordDto): Promise<ResponseDto>
    sendMailResetPassword(email: EmailDto): void
    resetPassword(token: string, password: PasswordDto): Promise<ResponseDto>
}
