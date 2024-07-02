import { Body, Controller, Inject, Post } from "@nestjs/common";
import CONSTANTS from "libs/constants";
import { RoleManagerApplication } from "../application/roleManagerApplication";
import { CreateRoleDto } from "./dtos/createRole.dto";
import { companyApplication } from "src/company-manager/application/companyApplication";


@Controller('role')
export default class RoleManagerController {
    constructor(
        @Inject(CONSTANTS.STRINGS.ROLE_APPLICATION) private role: RoleManagerApplication,
        @Inject(CONSTANTS.STRINGS.COMPANY_APPLICATION) private company: companyApplication
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
        }
    }
}