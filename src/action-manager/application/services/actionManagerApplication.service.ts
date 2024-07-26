import { IResponseHandlerResponse } from "libs/constants/interfaces";
import { ActionManagerApplication } from "../actionManagerApplication";
import handleRsponse from "libs/responseHandler/responseHandler";
import { ActionManagerService } from "src/action-manager/domain/ports/actionService";
import { CompanyService } from "src/company-manager/domain/ports/companyService";

export class ActionManagerApplicationService implements ActionManagerApplication{

    constructor(
        private action:ActionManagerService,
        private company:CompanyService
    ){}

    async getActionById(id: string): Promise<IResponseHandlerResponse> {
        try {
                const action = await this.action.getActionById(id)
                
                if(!action){
                    return handleRsponse(400,"action not found",{})
                }

                return handleRsponse(200,"Action detail",action);
        } catch (error) {
            console.log(error.message.error.stack,"context: getActionById")
            return handleRsponse(500,"internal error",{})
        }
    }

    async createAction(name: string, url: string,companyId:string): Promise<IResponseHandlerResponse> {
        try {
            const checkCompany = await this.company.findOneById(companyId)

            if(!checkCompany){
                return handleRsponse(400,"Company does not exist",{})
            }

            const entity = this.action.create({name:name,url:url,company:checkCompany})

            const saveReturn = this.action.save(entity)

        } catch (error) {
            console.log(error.message.error.stack,"context: createAction")
            return handleRsponse(500,"internal error",{})
        }
    }
    

}