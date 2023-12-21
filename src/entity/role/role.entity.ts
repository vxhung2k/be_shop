import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from '../index.entity'

@Entity('role')
class RoleEntity {
    @PrimaryGeneratedColumn()
    public id?: number

    @Column({ unique: true })
    public key: string

    @Column()
    public name: string

    @ManyToOne(() => UserEntity, (user) => user.roles)
    public user: UserEntity
}
export { RoleEntity }
