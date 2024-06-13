import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity, UsersEntity } from 'src/entities';
import { SecurityMiddleware } from 'libs/middlewares/encrypt';
import ConnectionService from './connection.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([UsersEntity,RoleEntity]), 
    ],
    controllers: [],
    providers: [ConnectionService],
    exports:[ConnectionService]
})
export default class ConnectionModule{}