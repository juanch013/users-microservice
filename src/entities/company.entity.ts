import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import RoleEntity from './role.entity';

@Entity({ name: "company" })
export default class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name:"name"})
  name: string;

  @Column({name:"role_version",default:"0"})
  roleVersion: string;

  @OneToMany(() => RoleEntity, role => role.company)
  roles: RoleEntity[];

  @CreateDateColumn({name:"create_date"})
  createDate:Date

  @UpdateDateColumn({name:"create_date"})
  updateDate:Date
}