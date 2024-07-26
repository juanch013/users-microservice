import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthManagerModule } from '../auth-manager/auth-manager.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv'
import ConnectionService from 'src/connection/connection.service';
import ConnectionModule from 'src/connection/connection.module';
import { CompanyEntity, RoleEntity } from 'src/entities';
import ActionsEntity from 'src/entities/actions.entity';
import { CompanyManagerModule } from 'src/company-manager/company-manager.module';
import CompanyRepositoryAdapter from 'src/company-manager/domain/adapters/CompanyRepositoryAdapter';
import { RoleManagerModule } from 'src/role-manager/roleManager.module';
import RoleRepositoryAdapter from 'src/role-manager/domain/adapters/RoleRepositoryAdapter';
import { ActionManagerModule } from 'src/action-manager/actionManager.module';
import { ActionManagerRepositoryAdapter } from 'src/action-manager/domain/adapters/ActionRepositoryAdapter';
import { MongooseModule } from '@nestjs/mongoose';
import { DocuementTemplateRepositoryAdapter } from 'src/company-manager/domain/adapters/DocumentTemplatesRepositoryAdapter';
import { JwtMiddleware } from 'libs/middlewares/jwtMiddleware';
dotenv.config()


@Module({
  imports: [
    AuthManagerModule,
    ConnectionModule,
    
    TypeOrmModule.forRootAsync({
      imports:[ConnectionModule,CompanyManagerModule],
      inject:[ConnectionService],
      useFactory: async (connectionService: ConnectionService) => connectionService.getConnection(),
    }),

    MongooseModule.forRootAsync({
      imports:[ConnectionModule],
      inject:[ConnectionService],
      useFactory: async (connectionService: ConnectionService) => connectionService.getMongoConnection()
    }),

    TypeOrmModule.forFeature([RoleEntity, ActionsEntity,ActionsEntity,CompanyEntity]),

    CompanyManagerModule.register({
      modules: [],
      adapters: {
        companyRepository: CompanyRepositoryAdapter,
        templatesRepository: DocuementTemplateRepositoryAdapter
      }
    }),

    RoleManagerModule.register({
      modules: [],
      adapters: {
        roleRepository: RoleRepositoryAdapter,
      }
    }),

    ActionManagerModule.register({
      modules: [],
      adapters: {
        actionsRepository: ActionManagerRepositoryAdapter,
      }
    }),

  ],
  controllers: [],
  providers: [ConnectionService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude({ path: 'auth/login', method: RequestMethod.ALL })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
  
}
