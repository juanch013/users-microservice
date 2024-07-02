import { DeepPartial } from "typeorm";
import { ActionManagerRepository, ActionManagerService } from "../ports/actionService";
import { ActionsEntity } from "src/entities";
import { Inject, Injectable } from "@nestjs/common";
import CONSTANTS from "libs/constants";

@Injectable()
export class ActionManagerDomainService implements ActionManagerService{
    constructor(
        @Inject(CONSTANTS.STRINGS.ACTION_REPOSITORY)
        private actionRepository:ActionManagerRepository
    ){}

    create(action:DeepPartial<ActionsEntity>): ActionsEntity | null {
        try {
            return this.actionRepository.create(action);
        } catch (error) {
            console.log(error.message,error.stack,"context: create");
            return null
        }
    }

    async save(entity:ActionsEntity): Promise <ActionsEntity | null> {
        try {
            return await this.actionRepository.save(entity);
        } catch (error) {
            console.log(error.message,error.stack,"context: save");
            return null; 
        }
    }
    
}