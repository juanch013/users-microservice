import { Inject, Injectable } from "@nestjs/common";
import { CompanyEntity } from "src/entities";
import { DeepPartial, FindManyOptions } from "typeorm";
import { CompanyService, DocumentTemplatesRepository } from "../ports/companyService";
import {companyRepository} from '../ports/companyService'
import {CONSTANTS} from "libs/constants";

@Injectable()
export default class CompanyDomainService implements CompanyService {
    constructor(
        @Inject(CONSTANTS.STRINGS.COMPANY_REPOSITORY) private companyRepository: companyRepository,
        @Inject(CONSTANTS.STRINGS.TEMPLATES_REPOSITORY) private templatesRepository: DocumentTemplatesRepository
    ){}

    async findTemplateById(templateid: string): Promise<any> {
        try {
            return await this.templatesRepository.findById(templateid)
        } catch (error) {
            console.log(error.message,error.stack,"context: findTemplatebyId")
            return null;
        }
    }

    async find(options?: FindManyOptions<CompanyEntity>):Promise<CompanyEntity[]> {
        try {
            return await this.companyRepository.find(options)
        } catch (error) {
            console.log(error.message,error.stack,"context: find")
            return null;
        }
    }
    
    async updateCompany(company: CompanyEntity): Promise<CompanyEntity> {
        return await this.companyRepository.save(company)
    }

    async getRolesByCompany(id: string): Promise<CompanyEntity[]> {
        try {
            return await this.companyRepository.find({where:{id:id},relations:['roles']})
        } catch (error) {
            console.log(error.message,error.stack,"context: findOneCompany")
            return null;
        }
    }

    async findOneById(id:string){
        try {
            return await this.companyRepository.findOneById(id)
        } catch (error) {
            console.log(error.message,error.stack,"context: findOneCompany");
            return null;
        }
    }

    async checkExist(companyId:string):Promise<boolean>{
        try {
            return await this.companyRepository.exist(companyId)
        } catch (error) {
            console.log(error.message,error.stack,"context: findOneCompany");
            return null;
        }
    }

    async checkCompanyName(name:string):Promise<boolean>{
        try {
            return await this.companyRepository.checkCompanyName(name)
        } catch (error) {
            console.log(error.message,error.stack,"context: findOneCompany");
            return null;
        }
    }

    async createCompany(companyCreateOptions: DeepPartial<CompanyEntity>):Promise <CompanyEntity> {
        try {
            return this.companyRepository.create(companyCreateOptions)
        } catch (error) {
            console.log(error.message,error.stack,"context : createcompany")
            return null;
        }
    }

    async saveCompany(company: CompanyEntity): Promise<CompanyEntity> {
        try {
            return this.companyRepository.save(company);
        } catch (error) {
            console.log(error.message,error.stack,"context : saveCompany")
            return null;
        
        }
    }

    async createDocumentTemplate(company:CompanyEntity,name:string,template:string){
        try {
            return await this.templatesRepository.create(company.id,name,template);
        } catch (error) {
            console.log(error.message,error.stack,"context : saveCompany")
            return null;
        }
    }

    async getTemplateByNameAndCompany(companyId:string,name:string){
        try {
            return await this.templatesRepository.findByNameAndCompany(companyId,name);
        } catch (error) {
            console.log(error.message,error.stack,"context : saveCompany")
            return null;
        }
    }

    
}