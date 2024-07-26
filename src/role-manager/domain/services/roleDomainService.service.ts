import { RoleEntity } from "src/entities";
import { FindManyOptions, DeepPartial, FindOneOptions } from "typeorm";
import { RoleService, roleRepository } from "../ports/roleService";
import { Inject } from "@nestjs/common";
import {CONSTANTS} from "libs/constants";

export class RoleManagerDomainService implements RoleService{
    constructor(
        @Inject(CONSTANTS.STRINGS.ROLE_REPOSITORY) private roleRepository: roleRepository,
    ){}

    async findOneById(id:string): Promise<RoleEntity | null> {
        try {
            return await this.roleRepository.findOne({where:{id:id}});
        } catch (error) {
            console.log(error.mesage,error.stack,"context: create")
            return null
        }
    }

    async find(options: FindManyOptions<RoleEntity>): Promise<RoleEntity[] | null> {
        try {
            return await this.roleRepository.find(options);
        } catch (error) {
            console.log(error.mesage,error.stack,"context: create")
            return null
        }
    }

    async create(createOptions: DeepPartial<RoleEntity>): Promise<RoleEntity | null> {
        try {
            return this.roleRepository.create(createOptions);
        } catch (error) {
            console.log(error.mesage,error.stack,"context: create")
            return null
        }
    }


}