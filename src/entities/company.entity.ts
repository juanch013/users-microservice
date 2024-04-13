import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import RoleEntity from './role.entity';

@Entity({ name: "company" })
export default class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => RoleEntity, role => role.company)
  roles: RoleEntity[];
}