import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity, RoleEntity } from 'src/entities';
import CONSTANTS from 'libs/constants';
import { DynamicModule, Module } from '@nestjs/common';
import RoleRepositoryAdapter from './domain/adapters/RoleRepositoryAdapter';
import { CompanyManagerModule } from 'src/company-manager/company-manager.module';
import { RoleModuleOptions } from 'libs/constants/types';
import { RoleManagerDomainService } from './domain/services/roleDomainService.service';
import RoleManagerApplicationService from './application/services/roleManagerApplication.service';
import CompanyDomainService from 'src/company-manager/domain/services/companyDomain.service';
import {roleRepository} from './domain/ports/roleService'
import { companyApplicationService } from 'src/company-manager/application/services/companyApplication.service';
import RoleManagerController from './infraestructure/roleManager.controller';


@Module({
  imports:[
    CompanyManagerModule,
    TypeOrmModule.forFeature([CompanyEntity,RoleEntity])
  ],
  controllers: [RoleManagerController],
  providers: [
    RoleManagerDomainService,
    RoleRepositoryAdapter,
    RoleManagerApplicationService,
    companyApplicationService,
    {
      provide: CONSTANTS.STRINGS.ROLE_REPOSITORY,
      useClass: RoleRepositoryAdapter,
    }
  ],
})

export class RoleManagerModule {
  
  static register(options: RoleModuleOptions ):DynamicModule{

    const { modules } = options

    const RoleManagerApplicationProvider = {
      provide: CONSTANTS.STRINGS.ROLE_APPLICATION,
      useFactory(role: RoleManagerDomainService,company: CompanyDomainService) {
        return new RoleManagerApplicationService(role,company);
      },
      inject: [
        CONSTANTS.STRINGS.ROLE_SERVICE
      ]
    }

    const RoleManagerServiceProvider = {
      provide: CONSTANTS.STRINGS.ROLE_SERVICE,
      useFactory(roleRepository: roleRepository) {
        return new RoleManagerDomainService(roleRepository)
      },
      inject: [
        CONSTANTS.STRINGS.ROLE_REPOSITORY,
      ]
    }
    
    return {
      module: RoleManagerModule,
      global: true,
      imports:[
        ...modules
      ],
      providers: [
        RoleManagerApplicationProvider,
        RoleManagerServiceProvider
      ],
      controllers:[],
      exports:[
        CONSTANTS.STRINGS.ROLE_APPLICATION
      ],
    }
  }
}