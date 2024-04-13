import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthManagerModule } from '../auth-manager/auth-manager.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionService } from 'src/connection/connection.service';
import { CompanyEntity, RoleEntity, UsersEntity } from 'src/entities';

@Module({
  imports: [
    AuthManagerModule,
    TypeOrmModule.forRoot({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'users',
        entities:[UsersEntity,CompanyEntity,RoleEntity],
        synchronize: true
})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
