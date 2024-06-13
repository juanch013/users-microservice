import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import RoleEntity from './role.entity';
import CompanyEntity from './company.entity';

@Entity({ name: "action" })
export default class ActionsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({type:'text'})
    url: string;

    @Column({unique:true})
    key:string

    @ManyToMany(() => RoleEntity, role => role.actions)
    roles: RoleEntity[]

    @OneToOne(() => CompanyEntity)
    @JoinColumn()
    company:CompanyEntity

    @CreateDateColumn({name:"create_date"})
    createDate:Date

    @UpdateDateColumn({name:"create_date"})
    updateDate:Date
}