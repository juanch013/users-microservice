import { GetTemplateByNameDto } from './../infrastructure/dtos/GetTemplateByName.dto';
import { IResponseHandlerResponse } from "libs/constants/interfaces";
import { CompanyEntity } from "src/entities";

export interface companyApplication {
    getRolesByCompany(companyId:string):Promise<IResponseHandlerResponse>
    createCompany(name:string):Promise<IResponseHandlerResponse>
    updateCompany(companyId:string,name:string):Promise<IResponseHandlerResponse>
    upgradeRoleVersion(companyId:string): Promise<IResponseHandlerResponse>
    getCompanyById(companyId:string):Promise<IResponseHandlerResponse>
    createDocumentTemplate(company:CompanyEntity,name:string,template:string):Promise<IResponseHandlerResponse>
    getTemplateByNameAndCompany(companyId:string,name:string):Promise<IResponseHandlerResponse>
}