import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionsEntity, CompanyEntity } from 'src/entities';
import CONSTANTS from 'libs/constants';
import { DynamicModule, Module } from '@nestjs/common';
import { CompanyManagerModule } from 'src/company-manager/company-manager.module';
import { ActionsModuleoptions, RoleModuleOptions } from 'libs/constants/types';
import CompanyDomainService from 'src/company-manager/domain/services/companyDomain.service';
import { companyApplicationService } from 'src/company-manager/application/services/companyApplication.service';
import { ActionManagerController } from './infraestructure/ActionManager.controller';
import { ActionManagerDomainService } from './domain/services/ActionDomain.service';
import { ActionManagerRepositoryAdapter } from './domain/adapters/ActionRepositoryAdapter';
import { ActionManagerApplicationService } from './application/services/actionManagerApplication.service';
import { ActionManagerRepository } from './domain/ports/actionService';

@Module({
  imports:[
    CompanyManagerModule,
    TypeOrmModule.forFeature([CompanyEntity,ActionsEntity])
  ],
  controllers: [ActionManagerController],
  providers: [
    ActionManagerDomainService,
    ActionManagerRepositoryAdapter,
    ActionManagerApplicationService,
    companyApplicationService,
    {
      provide: CONSTANTS.STRINGS.ACTION_REPOSITORY,
      useClass: ActionManagerRepositoryAdapter,
    }
  ],
})

export class ActionManagerModule {
  
  static register(options: ActionsModuleoptions): DynamicModule{

    const { modules } = options

    const ActionManagerApplicationProvider = {
      provide: CONSTANTS.STRINGS.ACTION_APPLICATION,
      useFactory(action: ActionManagerDomainService,company: CompanyDomainService) {
        return new ActionManagerApplicationService(action,company);
      },
      inject: [
        CONSTANTS.STRINGS.ACTION_SERVICE
      ]
    }

    const ActionManagerServiceProvider = {
      provide: CONSTANTS.STRINGS.ACTION_SERVICE,
      useFactory(actionRepository: ActionManagerRepository) {
        return new ActionManagerDomainService(actionRepository)
      },
      inject: [
        CONSTANTS.STRINGS.ACTION_REPOSITORY,
      ]
    }
    
    return {
      module: ActionManagerModule,
      global: true,
      imports:[
        ...modules
      ],
      providers: [
        ActionManagerApplicationProvider,
        ActionManagerServiceProvider
      ],
      controllers:[],
      exports:[
        CONSTANTS.STRINGS.ACTION_APPLICATION
      ],
    }
  }
}