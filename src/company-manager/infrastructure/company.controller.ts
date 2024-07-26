import { Body, Controller, Get, Inject, Injectable, OnApplicationBootstrap, Param, Post, Put, Query } from "@nestjs/common";
import { companyApplication } from "../application/companyApplication";
import {CONSTANTS} from "libs/constants";
import { GetRolesbyCompanyDto } from "./dtos/GetRolesbyCompany.dto";
import { CreateCompanyDto } from "./dtos/CreateCompany.dto";
import { UpdateCompanyDto } from "./dtos/UpdateCompany.dto";
import { CreateDocumentTemplateDto } from "./dtos/CreateDocumentTemplate.dto";
import handleRsponse from "libs/responseHandler/responseHandler";
import { GetTemplateByNameDto } from "./dtos/GetTemplateByName.dto";
import { UpdateTemplateDto } from "./dtos/UpdateTemplate.dto";

@Injectable()
@Controller("company")
export default class CompanyManagerController {
    constructor(
        @Inject(CONSTANTS.STRINGS.COMPANY_APPLICATION) private application: companyApplication
    ){}

    @Get("roles-by-company")
    async getRolesbyCompany(@Query() query:GetRolesbyCompanyDto){
        try {
            return await this.application.getRolesByCompany(query.id);
        } catch (error) {
            console.log(error.message,error.stack,"context: getRolesbyCompany")
            return handleRsponse(500,"internal error",{})
        }
    }

    @Post("create-company")
    async createCompany(@Body() body:CreateCompanyDto){
        try {
            return await this.application.createCompany(body.name);
        } catch (error) {
            console.log(error.message,error.stack,"context: createCompany")
            return handleRsponse(500,"internal error",{})
        }
    }

    @Put("update-company")
    async updateCompany(@Body() body:UpdateCompanyDto){
        try {
            return await this.application.updateCompany(body.id,body.name)
        } catch (error) {
            console.log(error.message,error.stack,"context: updateCompany")
            return handleRsponse(500,"internal error",{})
        }
    }

    @Post("create-template")
    async createTemplateTemplate(@Body() body:CreateDocumentTemplateDto){
        try {
            const company = await this.application.getCompanyById(body.companyId)

            if(company.code !== 200){
                return handleRsponse (400,"company do not exist",{})
            }

            const checkDocumentExist = await this.application.getTemplateByNameAndCompany(company.data.id,body.name)

            if(checkDocumentExist.code === 200){
                return handleRsponse (400,"this docuement already exist for this company",{})
            }

            return await this.application.createDocumentTemplate(company.data,body.name,body.template)

        } catch (error) {
            console.log(error.message,error.stack,"context: createDocumentTemplate")
            return handleRsponse(500,"internal error",{})
        }
    }

    @Get("find-template")
    async getTemplateByName(@Query() queryParams:GetTemplateByNameDto){
        try {
            const {companyId,name} = queryParams;

            return await this.application.getTemplateByNameAndCompany(companyId,name)
        } catch (error) {
            console.log(error.message,error.stack,"context: createDocumentTemplate")
            return handleRsponse(500,"internal error",{})
        }
    }

    @Put("update-template")
    async updateTemplate(@Body() body:UpdateTemplateDto){
        try {
            const template = await this.application.getTemplateById(body.templateId)

            if(template.code !== 200){
                return handleRsponse(400,"template do not exist",{})
            }

            return await this.application.updateTemplate(body.templateId,body.template);

        } catch (error) {
            console.log(error.message,error.stack,"context: updateTemplate")
            return handleRsponse(500,"internal error",{})
        }
    }
}