import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator'
import { passwordRegex, phoneRegex } from 'src/helper/regex/regex'
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { GenderEnum, UserTypeEnum } from '../../modules/user/const/user.enum'
import { Optional } from '@nestjs/common'
import { AvatarEntity } from '../index.entity'

@Entity('user')
class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string

    @Column({ unique: true })
    public email: string

    @Column()
    @IsNotEmpty()
    @IsString()
    public username: string

    @Column()
    @IsNotEmpty()
    @Matches(passwordRegex)
    public password: string

    @Column({ type: 'enum', enum: GenderEnum })
    @Optional()
    @IsEnum(GenderEnum, { each: true })
    public gender: GenderEnum

    @Column({ type: 'enum', enum: UserTypeEnum })
    @IsNotEmpty()
    @IsEnum(UserTypeEnum, { each: true })
    public user_type: UserTypeEnum

    @Column()
    @IsString()
    public fullName: string

    @Column()
    @IsString()
    public fullAddress?: string

    @Column()
    @IsString()
    @Matches(phoneRegex)
    public phone: string

    @OneToMany(() => AvatarEntity, (avatar) => avatar.user, { cascade: true })
    public avatars: AvatarEntity[]

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public updatedAt: Date
}
export { UserEntity }
