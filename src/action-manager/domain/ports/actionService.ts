import { ActionsEntity } from "src/entities"
import { DeepPartial } from "typeorm"

export interface ActionManagerRepository{
    create(action:DeepPartial<ActionsEntity>): ActionsEntity | null
    save(action:ActionsEntity): Promise <ActionsEntity | null>
}


export interface ActionManagerService{
    create(action:DeepPartial<ActionsEntity>): ActionsEntity | null
    save(action:ActionsEntity):Promise<ActionsEntity | null>
}