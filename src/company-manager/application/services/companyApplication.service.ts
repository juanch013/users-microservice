import { CompanyService } from "src/company-manager/domain/ports/companyService";
import { companyApplication } from "../companyApplication";
import { IResponseHandlerResponse } from "libs/constants/interfaces";
import handleRsponse from "libs/responseHandler/responseHandler";
import { CompanyEntity } from "src/entities";
import { create } from "domain";
import { find } from "rxjs";

export class companyApplicationService implements companyApplication {
    constructor(private company: CompanyService) {}

    async updateTemplate(templateId: string, template: string): Promise<IResponseHandlerResponse> {
        try {
            
        } catch (error) {
            console.log(error.message,error.stack,"context: updateTemplate");
            return handleRsponse(500,"internal error",{});
        }
    }

    async getTemplateById(templateId: string): Promise<IResponseHandlerResponse> {
        try {
            const findRet = await this.company.findTemplateById(templateId);

            if(!findRet){
                return handleRsponse(400,"template do not exist",{});
            }

            return handleRsponse(200,"template detail",findRet)
        } catch (error) {
            console.log(error.message,error.stack,"context: updateTemplate");
            return handleRsponse(500,"internal error",{});
        }
    }

    async getTemplateByNameAndCompany(companyId: string, name: string): Promise<IResponseHandlerResponse> {
        try {
            const findRet = await this.company.getTemplateByNameAndCompany(companyId,name)

            if(!findRet){
                return handleRsponse(400,"template not found",{})
            }

            return handleRsponse(200,"template detail",findRet);

        } catch (error) {
            console.log(error.message, error.stack, "context: createDocumentTemplate")
            return handleRsponse(500,"internal error",{})
        }
    }

    async createDocumentTemplate(company: CompanyEntity, name: string, template: string): Promise<IResponseHandlerResponse> {
        try {
            const createResp = await this.company.createDocumentTemplate(company,name,template)

            if(!createResp){
                return handleRsponse(500,"error creating document template",{})
            }

            return handleRsponse(400,"document template created successfully",createResp)
        } catch (error) {
            console.log(error.message, error.stack, "context: createDocumentTemplate")
            return handleRsponse(500,"internal error",{})
        }
    }

    async getCompanyById(companyId: string): Promise<IResponseHandlerResponse> {
        try {
            const company = await this.company.findOneById(companyId);

            if(!company){
                return handleRsponse(400,"company do not exist",{})
            }

            return handleRsponse(200,"company detail",company);
        } catch (error) {
            console.log(error.message, error.stack, "context: upgradeRoleVersion")
            return handleRsponse(500,"internal error",{})
        }
    }

    async upgradeRoleVersion(companyId: string): Promise<IResponseHandlerResponse> {
        try{
            const checkCompany = await this.company.findOneById(companyId);
            
            if(!checkCompany){
                return handleRsponse(400,"Company do not exist",{})
            }   

            checkCompany.roleVersion = String(Number(checkCompany.roleVersion) + 1);

            const updateResult = await this.company.updateCompany(checkCompany)

            if(!updateResult){
                return handleRsponse(500,"internal error",{})
            }

            return handleRsponse(200,"company role updated successfully",updateResult);
        }catch(error){
            console.log(error.message, error.stack, "context: upgradeRoleVersion")
            return handleRsponse(500,"internal error",{});
        }
    }

    async updateCompany(companyId:string,name: string): Promise<IResponseHandlerResponse> {
        try {
            const checkCompanyExist = await this.company.findOneById(companyId);

            if(!checkCompanyExist){
                return handleRsponse(400,"Company do not exist",{});
            }
            const check = await this.company.checkCompanyName(name);
            if(check){
                return handleRsponse(400,"Name is already registered",{})
            }

            checkCompanyExist.name = name;

            await this.company.saveCompany(checkCompanyExist)
            return handleRsponse(201, "Company was successfully created", checkCompanyExist)
        } catch (error) {
            console.log(error.message, error.stack, "context: updateCompany")
            return handleRsponse(500,"internal error",{});
        }
    }

    async getRolesByCompany(companyId: string): Promise<IResponseHandlerResponse> {
        try {
            const checkCompany = await this.company.checkExist(companyId)
            if (!checkCompany) {
                return handleRsponse(400, "Company does not exist", {});
            }
            const roles = await this.company.getRolesByCompany(companyId);
            return handleRsponse(200, "Roles by company", roles)
        } catch (error) {
            console.log(error.message, error.stack, "context: getRolesCompany")
            return handleRsponse(500,"internal error",{});
        }
    }

    async createCompany(name: string): Promise<IResponseHandlerResponse> {
        try {
            const checkCompanyName = await this.company.checkCompanyName(name)
            if (checkCompanyName) {
                return handleRsponse(400, "Name is already registered", {})
            }
            const createResult = await this.company.createCompany({ name: name })
            await this.company.saveCompany(createResult)
            return handleRsponse(201, "Company was successfully created", createResult)
        } catch (error) {
            console.log(error.message, error.stack, "context: createCompany")
            return handleRsponse(500,"internal error",{});
        }
    }
}