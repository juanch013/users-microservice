import { ActionsEntity } from "src/entities";
import { DeepPartial, Repository } from "typeorm";
import { ActionManagerRepository } from "../ports/actionService";
import { InjectRepository } from "@nestjs/typeorm";

export class ActionManagerRepositoryAdapter implements ActionManagerRepository{

    constructor(
        @InjectRepository(ActionsEntity)
        private readonly actionRepository: Repository<ActionsEntity>
    ){}

    async save(action: ActionsEntity): Promise <ActionsEntity | null> {
        try {
            return await this.actionRepository.save(action);
        } catch (error) {
            console.log(error.message,error.stack,"context: save");
            return null;
        }
    }

    create(action: DeepPartial<ActionsEntity>): ActionsEntity | null {
        try {
            return this.actionRepository.create(action);
        } catch (error) {
            console.log(error.message,error.stack,"context: create")
            return null;
        }
    }

}