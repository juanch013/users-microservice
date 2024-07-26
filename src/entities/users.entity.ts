import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import RoleEntity from './role.entity';
import {CONSTANTS} from "../../libs/constants/index";
import { UserStatusEnum } from 'libs/constants/enums';

@Entity({ name: "users" })
export default class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name:"name",nullable:false})
  name: string;

  @Column({name:"email",nullable:false})
  email: string;

  @Column({name:"password",nullable:false,type:'text'})
  password: string;

  @Column({name:"status",nullable:false,default:false})
  status: UserStatusEnum;

  @ManyToOne(() => RoleEntity, rol => rol.id)
  role: RoleEntity;
}


//probar encriptacion y generar migracion para cambio de tipo de columna