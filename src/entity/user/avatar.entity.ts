import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { UserEntity } from '../index.entity'

@Entity('avatar')
class AvatarEntity {
    @PrimaryGeneratedColumn()
    public id?: number

    @Column()
    public url: string

    @Column()
    public fileId: string

    @ManyToOne(() => UserEntity, (user) => user.avatars)
    public user: UserEntity

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public updatedAt: Date
}
export { AvatarEntity }
