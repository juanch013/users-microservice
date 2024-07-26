import { IResponseHandlerResponse } from "libs/constants/interfaces";

export interface ActionManagerApplication{
    createAction(name:string,url:string,companyId:string):Promise<IResponseHandlerResponse>
    getActionById(id:string):Promise<IResponseHandlerResponse>
}