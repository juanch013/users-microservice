import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import UserManagerService from './users-manager.service';
import UserManagerController from './users-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity, UsersEntity } from 'src/entities';
import { UuidsQueryMiddleware } from './middleware/get-user-by-id';
import { SecurityMiddleware } from 'libs/middlewares/encrypt';

@Module({
    imports:[
        TypeOrmModule.forFeature([UsersEntity,RoleEntity]), 
    ],
    controllers: [UserManagerController],
    providers: [UserManagerService],
})
export class UserManagermodule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(UuidsQueryMiddleware)
        .forRoutes(
            { path: 'users/get-users-by-id', method: RequestMethod.GET }
        );
        
      consumer
        .apply(SecurityMiddleware)
        .forRoutes(
            { path: 'users/create', method: RequestMethod.POST }
        );

      consumer
        .apply(SecurityMiddleware)
        .forRoutes(
            { path: 'users/update-pass', method: RequestMethod.POST }
        );
    }
  }