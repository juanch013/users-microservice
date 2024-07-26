import { IResponseHandlerResponse } from "libs/constants/interfaces";

export interface RoleManagerApplication {
    createRole(name:string,companyId:string):Promise<IResponseHandlerResponse>
    getRoleById(id:string):Promise<IResponseHandlerResponse>
}