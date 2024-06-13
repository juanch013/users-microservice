import { CompanyEntity } from "src/entities"
import { DeepPartial, FindManyOptions } from "typeorm"

export interface CompanyService{    
    findOneById(id:string):Promise<CompanyEntity | null>
    find(options?:FindManyOptions<CompanyEntity>):Promise<CompanyEntity[] | null>
    checkExist(id:string):Promise<boolean | null>
    getRolesByCompany(id:string):Promise<CompanyEntity[] | null>
    checkCompanyName(name:string):Promise<boolean | null>
    createCompany(createOptions:DeepPartial<CompanyEntity>):Promise<CompanyEntity | null>
    saveCompany(company:CompanyEntity): Promise<CompanyEntity | null>
    updateCompany(company:CompanyEntity):Promise<CompanyEntity | null>
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