import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import UsersEntity from './users.entity';
import CompanyEntity from './company.entity';
import ActionsEntity from './actions.entity';

@Entity({ name: "role" })
export default class RoleEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => UsersEntity, user => user.role)
    users: UsersEntity[];

    @ManyToOne(() => CompanyEntity, company => company.roles)
    company: CompanyEntity;

    @ManyToMany(() => ActionsEntity, action => action.roles)
    @JoinTable()
    actions: ActionsEntity[]
}