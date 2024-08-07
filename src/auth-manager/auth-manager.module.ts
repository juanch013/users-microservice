import { Module } from '@nestjs/common';
import AuthManagerController from './auth-manager.controller';
import AuthManagerService from './auth-manager.service';
import { UserManagermodule } from 'src/users-manager/users-manager.module';
import UserManagerService from 'src/users-manager/users-manager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity, UsersEntity } from 'src/entities';


@Module({
  imports:[
    TypeOrmModule.forFeature([UsersEntity,RoleEntity]),
    UserManagermodule
  ],
  controllers: [AuthManagerController],
  providers: [AuthManagerService,UserManagerService]
})
export class AuthManagerModule {}