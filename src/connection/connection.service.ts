import { Injectable } from "@nestjs/common"
import { UsersEntity,CompanyEntity,RoleEntity } from "src/entities"

@Injectable()
export class ConnectionService{
    public getConnection(){
        const configObject = {
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: '1',
                password: '1',
                database: 'users',
                entities:[UsersEntity,CompanyEntity,RoleEntity],
                synchronize: true
        }
        return configObject
    }
}