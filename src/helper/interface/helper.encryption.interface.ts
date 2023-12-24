import { UserEntity } from 'src/entity/index.entity'
import { IAccessToken } from './access-token.interface'

export interface IHelperEncryptionService {
    generateToken(user: UserEntity): Promise<string>
    generateRefreshToken(user: UserEntity): Promise<string>
    hashPassword(password: string): Promise<string>
    jwtVerifyAccessToken(token: string): Promise<IAccessToken | undefined>
    comparePassword(password1: string, password2: string): Promise<boolean>
}
