import { IResponseHandlerResponse } from "libs/constants/interfaces";

export interface companyApplication {
    getRolesByCompany(companyId:string):Promise<IResponseHandlerResponse>
    createCompany(name:string):Promise<IResponseHandlerResponse>
    updateCompany(companyId:string,name:string):Promise<IResponseHandlerResponse>
    upgradeRoleVersion(companyId:string): Promise<IResponseHandlerResponse>
}