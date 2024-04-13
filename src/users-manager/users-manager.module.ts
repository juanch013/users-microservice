import { Module } from '@nestjs/common';
import UserManagerService from './users-manager.service';
import UserManagerController from './users-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity, UsersEntity } from 'src/entities';

@Module({
    imports:[
        TypeOrmModule.forFeature([UsersEntity,RoleEntity]), 
    ],
    controllers: [UserManagerController],
    providers: [UserManagerService],
})
export class UserManagermodule {}
