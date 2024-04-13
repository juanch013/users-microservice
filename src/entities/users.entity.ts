import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import RoleEntity from './role.entity';

@Entity({ name: "users" })
export default class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name:"name",nullable:false})
  name: string;

  @Column({name:"email",nullable:false})
  email: string;

  @Column({name:"password",nullable:false})
  password: string;

  @Column({name:"active",nullable:false,default:false})
  active: boolean;

  @ManyToOne(() => RoleEntity, rol => rol.id)
  role: RoleEntity;
}
