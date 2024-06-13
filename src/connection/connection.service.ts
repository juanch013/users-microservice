import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import CONSTANTS from '../../libs/constants/index'
import { UsersEntity,CompanyEntity,RoleEntity,ActionsEntity } from 'src/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class ConnectionService{
    constructor(){}

    getConnection():TypeOrmModuleOptions {
        const connectionObject:TypeOrmModuleOptions = {
            type: "mysql",
            host: CONSTANTS.STRINGS.DBHOST,
            port: 3306,
            username: process.env.DBUSER,
            password: process.env.DBPASS,
            database: process.env.DBNAME,
            entities:[UsersEntity,CompanyEntity,RoleEntity,ActionsEntity],
            synchronize: true,
            migrationsRun:true,
            migrations:[]
        }
        return connectionObject;
    }
}