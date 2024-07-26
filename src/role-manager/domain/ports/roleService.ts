import { RoleEntity } from "src/entities";
import { DeepPartial, FindManyOptions, FindOneOptions } from "typeorm";

export interface RoleService{
    find(options:FindManyOptions<RoleEntity>):Promise<RoleEntity[] | null>
    create(createOptions:DeepPartial<RoleEntity>):Promise<RoleEntity | null>
    findOneById(id:string):Promise<RoleEntity | null>
}

export interface roleRepository{
    find(options?:FindManyOptions<RoleEntity>): Promise<RoleEntity[] | null>
    save(company:RoleEntity): Promise<RoleEntity | null>
    findAll():Promise<RoleEntity[] | null>
    findOne(options:FindOneOptions<RoleEntity>): Promise<null | RoleEntity>
    exist(id:string):Promise<boolean | null>
    create(createOptions:DeepPartial<RoleEntity>): RoleEntity | null
}