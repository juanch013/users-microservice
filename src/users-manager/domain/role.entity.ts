import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
// import UsersEntity from './users.entity';
// import CompanyEntity from './company.entity';
import {IRoleEntity} from '../../../libs/constants/interfaces'

@Entity({ name: "role" })
export default class RoleEntity implements IRoleEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => UsersEntity, user => user.role)
  users: UsersEntity[];

  @ManyToOne(() => CompanyEntity, company => company.roles)
  company: CompanyEntity;
}