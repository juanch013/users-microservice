import { IResponseHandlerResponse } from "libs/constants/interfaces";
import { RoleManagerApplication } from "../roleManagerApplication";
import { RoleService } from "src/role-manager/domain/ports/roleService";
import { CompanyService } from "src/company-manager/domain/ports/companyService";
import handleRsponse from "libs/responseHandler/responseHandler";

export default class RoleManagerApplicationService implements  RoleManagerApplication{
    constructor(
        private roleService:RoleService,
        private companyService: CompanyService
    ){}

    async getRoleById(id: string): Promise<IResponseHandlerResponse> {
        try {
            const role = await this.roleService.findOne({where:{id:id}})

            if(!role){
                return handleRsponse(400,"Role does not exist",{})
            }

            return handleRsponse(200,"role detail",role)

        } catch (error) {
            console.log(error.message,error.stack,"context: createRole")
            return handleRsponse(500,"internal error",{});
        }
    }

    async createRole(name: string, companyId: string): Promise<IResponseHandlerResponse> {
        try {
            const company = await this.companyService.findOneById(companyId);

            if(!company){
                return handleRsponse(400,"company do not exist",{});
            }
    
            const roleEntity = await this.roleService.create({name:name,company:company});

            if(!roleEntity){
                return handleRsponse(500,"internal error",{});
            }

            return handleRsponse(201,"Role was successfully created",roleEntity);

        } catch (error) {
            console.log(error.message,error.stack,"context: createRole")
            return handleRsponse(500,"internal error",{});
        }
    }


}