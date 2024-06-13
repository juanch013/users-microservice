import { Type } from "@nestjs/common";
import { ActionManagerRepository } from "src/action-manager/domain/ports/actionService";
import { companyRepository } from "src/company-manager/domain/ports/companyService";
import { roleRepository } from "src/role-manager/domain/ports/roleService";

export type CompanyModuleOptions = {
    modules:[];
    adapters:{
        companyRepository: Type<companyRepository>,
    }
}

export type RoleModuleOptions = {
    modules:[];
    adapters:{
        roleRepository: Type<roleRepository>,
    }
}

export type ActionsModuleoptions = {
    modules:[];
    adapters:{
        actionsRepository: Type<ActionManagerRepository>,
    }
}