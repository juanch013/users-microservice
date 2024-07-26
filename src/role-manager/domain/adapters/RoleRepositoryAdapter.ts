import { Injectable } from "@nestjs/common";
import { roleRepository } from "../ports/roleService"
import { RoleEntity } from '../../../entities'
import { InjectRepository } from "@nestjs/typeorm"; 
import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from "typeorm";

@Injectable()
export default class RoleRepositoryAdapter implements roleRepository {
    constructor(
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>
    ) { }

    create(createOptions: DeepPartial<RoleEntity>): RoleEntity  | null {
        try {
            return this.roleRepository.create(createOptions);
        } catch (error) {
            console.log(error.message, error.stack, "context: create")
            return null; 
        }
    }

    async save(company: RoleEntity): Promise<RoleEntity | null> {
        try {
            return await this.roleRepository.save(company);
        } catch (error) {
            console.log(error.message, error.stack, "context: save")
            return null;
        }
    }

    async findAll(): Promise<RoleEntity[] | null> {
        try {
            return await this.roleRepository.find()
        } catch (error) {
            console.log(error.message, error.stack, "context: find")
            return null;
        }
    }

    async findOne(options:FindOneOptions<RoleEntity>): Promise<RoleEntity | null> {
        try {
            return await this.roleRepository.findOne(options)
        } catch (error) {
            console.log(error.message, error.stack, "context: findOne")
            return null;
        }
    }

    async exist(id: string): Promise<boolean | null> {
        try {
            return await this.roleRepository.exist({where:{id:id}})
        } catch (error) {
            console.log(error.message, error.stack, "context: exist")
            return null;
        }
    }

    async find(options:FindManyOptions<RoleEntity>):Promise<RoleEntity[] | null>{
        try {
            return this.roleRepository.find(options)
        } catch (error) {
            console.log(error.message,error.stack,"context: find")
            return null;
        }
    }
}


