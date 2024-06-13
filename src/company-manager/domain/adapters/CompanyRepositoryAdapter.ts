import { Injectable } from "@nestjs/common";
import { companyRepository } from  "../ports/companyService"
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindManyOptions, Repository } from "typeorm";
import { CompanyEntity } from '../../../entities' 

@Injectable()
export default class CompanyRepositoryAdapter implements companyRepository{
    constructor(
        @InjectRepository(CompanyEntity) 
        private companyRespository: Repository<CompanyEntity>
    ){}
    
    create(companyOptions: DeepPartial<CompanyEntity>): CompanyEntity | null {
        try {
            return this.companyRespository.create(companyOptions);
        } catch (error) {
            console.log(error.message,error.stack,"context: create")
            return null;
        }
    }

    async save(company: CompanyEntity): Promise<CompanyEntity | null > {
        try {
            const result = await this.companyRespository.save(company);
            return result;
        } catch (error) {
            console.log(error.message,error.stack,"context: save")
            return null;
        }
    }

    async checkCompanyName(companyName:string):Promise<boolean | null>{
        try {
            return await this.companyRespository.exist({where:{name:companyName}})
        } catch (error) {
            console.log(error.message,error.stack,"context: checkCompanyName")
            return null;
        }
    }

    async findAll(): Promise<CompanyEntity[]|null > {
        try {
            return await this.companyRespository.find()
        } catch (error) {
            console.log(error.message,error.stack,"context: findAll")
            return null;
        }
    }

    async findOneById(id: string): Promise<CompanyEntity | null > {
        try {
            return await this.companyRespository.findOne({where:{id:id}});
        } catch (error) {
            console.log(error.message,error.stack,"context: findOne")
            return null;

        }
    }
    async exist(id: string): Promise<boolean|null > {
        try {
            return await this.companyRespository.exist({where:{id:id}});
        } catch (error) {
            console.log(error.message,error.stack,"context: exist")
            return null;
        }
    }

    async find(options:FindManyOptions<CompanyEntity>): Promise<CompanyEntity[] | null>{
        try {
            return this.companyRespository.find(options)
        } catch (error) {
            console.log(error.message,error.stack,"context: find")
            return null;
        }
    }

    

}

