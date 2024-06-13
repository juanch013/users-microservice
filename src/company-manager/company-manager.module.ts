import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity, RoleEntity } from 'src/entities';
import CompanyManagerController from './infrastructure/company.controller';
import CompanyDomainService from './domain/services/companyDomain.service';
import { companyApplicationService } from './application/services/companyApplication.service';
import { CompanyModuleOptions } from 'libs/constants/types';
import { companyRepository } from './domain/ports/companyService';
import CompanyRepositoryAdapter from './domain/adapters/CompanyRepositoryAdapter';
import RoleRepositoryAdapter from '../role-manager/domain/adapters/RoleRepositoryAdapter';
import CONSTANTS from 'libs/constants';
import { roleRepository } from 'src/role-manager/domain/ports/roleService';


@Module({
  imports:[
    TypeOrmModule.forFeature([CompanyEntity,RoleEntity])
  ],
  controllers: [CompanyManagerController],
  providers: [
    CompanyDomainService,
    CompanyRepositoryAdapter,
    RoleRepositoryAdapter,
    companyApplicationService,
    {
      provide: CONSTANTS.STRINGS.COMPANY_REPOSITORY,
      useClass: CompanyRepositoryAdapter,
    }
  ],
})

export class CompanyManagerModule {

  static register(options: CompanyModuleOptions ):DynamicModule{

    const { modules } = options

    const CompanyApplicationProvider = {
      provide: CONSTANTS.STRINGS.COMPANY_APPLICATION,
      useFactory(company: CompanyDomainService) {
        return new companyApplicationService(company);
      },
      inject: [
        CONSTANTS.STRINGS.COMPANY_SERVICE
      ]
    }

    const CompanyServiceProvider = {
      provide: CONSTANTS.STRINGS.COMPANY_SERVICE,
      useFactory(companyRepository: companyRepository) {
        return new CompanyDomainService(companyRepository)
      },
      inject: [
        CONSTANTS.STRINGS.COMPANY_REPOSITORY,
      ]
    }

    return {
      module: CompanyManagerModule,
      global: true,
      imports:[
        ...modules
      ],
      providers: [
        CompanyApplicationProvider,
        CompanyServiceProvider
      ],
      controllers:[],
      exports:[
        CONSTANTS.STRINGS.COMPANY_APPLICATION
      ],
    }

  }

}