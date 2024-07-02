import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity, UsersEntity } from 'src/entities';
import { SecurityMiddleware } from 'libs/middlewares/encrypt';
import ConnectionService from './connection.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentFormatSchema } from 'src/schemas/document-format';

@Module({
    imports:[
        TypeOrmModule.forFeature([UsersEntity,RoleEntity]) 
    ],
    controllers: [],
    providers: [ConnectionService],
    exports:[ConnectionService]
})
export default class ConnectionModule{}