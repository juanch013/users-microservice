import { promises } from "dns"
import { ActionsEntity } from "src/entities"
import { DeepPartial, FindManyOptions } from "typeorm"

export interface ActionManagerRepository{
    create(action:DeepPartial<ActionsEntity>): ActionsEntity | null
    save(action:ActionsEntity): Promise <ActionsEntity | null>
    findOne(options:FindManyOptions<ActionsEntity>):Promise <ActionsEntity | null>
}


export interface ActionManagerService{
    create(action:DeepPartial<ActionsEntity>): ActionsEntity | null
    save(action:ActionsEntity):Promise<ActionsEntity | null>
    getActionById(id:string):Promise<ActionsEntity | null>
}