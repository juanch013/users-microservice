import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity, RoleEntity } from 'src/entities';
import CompanyManagerController from './infrastructure/company.controller';
import CompanyDomainService from './domain/services/companyDomain.service';
import { companyApplicationService } from './application/services/companyApplication.service';
import { CompanyModuleOptions } from 'libs/constants/types';
import { DocumentTemplatesRepository, companyRepository } from './domain/ports/companyService';
import CompanyRepositoryAdapter from './domain/adapters/CompanyRepositoryAdapter';
import CONSTANTS from 'libs/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentFormatSchema } from 'src/schemas/document-format';
import { DocuementTemplateRepositoryAdapter } from './domain/adapters/DocumentTemplatesRepositoryAdapter';


@Module({
  imports:[
    TypeOrmModule.forFeature([CompanyEntity,RoleEntity]),
    MongooseModule.forFeature([{ name: 'templates', schema: DocumentFormatSchema }])
  ],
  controllers: [CompanyManagerController],
  providers: [
    CompanyDomainService,
    CompanyRepositoryAdapter,
    companyApplicationService,
    {
      provide: CONSTANTS.STRINGS.COMPANY_REPOSITORY,
      useClass: CompanyRepositoryAdapter,
    },
    {
      provide: CONSTANTS.STRINGS.TEMPLATES_REPOSITORY,
      useClass: DocuementTemplateRepositoryAdapter,
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
      useFactory(companyRepository: companyRepository,templatesRepository: DocumentTemplatesRepository) {
        return new CompanyDomainService(companyRepository,templatesRepository)
      },
      inject: [
        CONSTANTS.STRINGS.COMPANY_REPOSITORY,
        CONSTANTS.STRINGS.TEMPLATES_REPOSITORY
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