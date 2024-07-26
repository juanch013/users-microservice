import { Body, Controller, Inject, Post } from "@nestjs/common";
import {CONSTANTS} from "libs/constants";
import { RoleManagerApplication } from "../application/roleManagerApplication";
import { CreateRoleDto } from "./dtos/createRole.dto";
import { companyApplication } from "src/company-manager/application/companyApplication";
import { ActionManagerApplication } from "src/action-manager/application/actionManagerApplication";
import handleRsponse from "libs/responseHandler/responseHandler";
import { AssignActionToRoleDto } from "./dtos/assignActionToRole.dto";


@Controller('role')
export default class RoleManagerController {
    constructor(
        @Inject(CONSTANTS.STRINGS.ROLE_APPLICATION) private role: RoleManagerApplication,
        @Inject(CONSTANTS.STRINGS.COMPANY_APPLICATION) private company: companyApplication,
        @Inject(CONSTANTS.STRINGS.ACTION_APPLICATION) private action: ActionManagerApplication

    ){}

    @Post("create-role")
    async createRole(@Body() body:CreateRoleDto){
        try {
            const createResult = await this.role.createRole(body.name,body.companyId);
            
            if(createResult.code > 300 || createResult.code < 200){
                return createResult
            }

            const upgradeResult = await this.company.upgradeRoleVersion(body.companyId);

            if(createResult.code > 300 || createResult.code < 200){
                return upgradeResult
            }

            return createResult;

        } catch (error) {
            console.log(error.message.error.stack,"context: createRole")
            return handleRsponse(500,"internal error",{})
        }
    }

    @Post('assign-acction-to-role')
    async assignActionToRole(@Body() body:AssignActionToRoleDto){
        try {
            const action = await this.action.getActionById(body.actionId);

            if(action.code !== 200){
                return handleRsponse(400,"Action do not exist",{})
            }

            const role = await this.role.getRoleById(body.roleId);

        } catch (error) {
            console.log(error.message.error.stack,"context: assignActionToRole")
            return handleRsponse(500,"internal error",{})
        }
    }


}