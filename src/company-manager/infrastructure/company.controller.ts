import { Body, Controller, Get, Inject, Injectable, OnApplicationBootstrap, Param, Post, Put, Query } from "@nestjs/common";
import { companyApplication } from "../application/companyApplication";
import CONSTANTS from "libs/constants";
import { GetRolesbyCompanyDto } from "./dtos/GetRolesbyCompany.dto";
import { CreateCompanyDto } from "./dtos/CreateCompany.dto";
import { UpdateCompanyDto } from "./dtos/UpdateCompany.dto";

@Injectable()
@Controller("company")
export default class CompanyManagerController {
    constructor(
        @Inject(CONSTANTS.STRINGS.COMPANY_APPLICATION) private application: companyApplication
    ){}

    @Get("roles-by-company")
    async getRolesbyCompany(@Query() query:GetRolesbyCompanyDto){
        return await this.application.getRolesByCompany(query.id);
    }

    @Post("create-company")
    async createCompany(@Body() body:CreateCompanyDto){
        return await this.application.createCompany(body.name);
    }

    @Put("update-company")
    async updateCompany(@Body() body:UpdateCompanyDto){
        return await this.application.updateCompany(body.id,body.name)
    }
}