import { Body, Controller, Inject, Post } from "@nestjs/common";
import CONSTANTS from "libs/constants";
import { ActionManagerApplication } from "../application/actionManagerApplication";
import { CreateActionDto } from "./dtos/createAction.dto";

@Controller("action")
export class ActionManagerController{
    constructor(
        @Inject(CONSTANTS.STRINGS.ACTION_APPLICATION) private actionApplication: ActionManagerApplication
    ){}

    @Post('create-action')
    async createAction(@Body() body:CreateActionDto){
        try {
            return await this.actionApplication.createAction(body.name,body.url,body.companyId)
        } catch (error) {
            
        }
    }
}