import { CompanyEntity } from "src/entities"
import { DeepPartial, FindManyOptions } from "typeorm"

export interface CompanyService{
    getTemplateByNameAndCompany(companyId: string, name: string): unknown    
    findOneById(id:string):Promise<CompanyEntity | null>
    find(options?:FindManyOptions<CompanyEntity>):Promise<CompanyEntity[] | null>
    checkExist(id:string):Promise<boolean | null>
    getRolesByCompany(id:string):Promise<CompanyEntity[] | null>
    checkCompanyName(name:string):Promise<boolean | null>
    createCompany(createOptions:DeepPartial<CompanyEntity>):Promise<CompanyEntity | null>
    saveCompany(company:CompanyEntity): Promise<CompanyEntity | null>
    updateCompany(company:CompanyEntity):Promise<CompanyEntity | null>
    createDocumentTemplate(company:CompanyEntity,name:string,template:string):Promise<any| null>
    getTemplateByNameAndCompany(companyId:string,name:string):Promise<any>
}

export interface companyRepository{
    find(options?:FindManyOptions<CompanyEntity>): Promise<CompanyEntity[] | null>
    save(company:CompanyEntity): Promise<CompanyEntity | null>
    findAll():Promise<CompanyEntity[] | null>
    findOneById(id:string): Promise<null | CompanyEntity>,
    exist(id:string):Promise<boolean | null>
    checkCompanyName(name:string):Promise<boolean | null>
    create(companyOptions:DeepPartial<CompanyEntity>):CompanyEntity | null
}

export interface DocumentTemplatesRepository{
    create(companyId: string, name: string, template: string):any
    findByNameAndCompany(companyId:string,name:string):any
}