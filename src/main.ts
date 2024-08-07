import 'newrelic';
import * as dotenv from 'dotenv'
dotenv.config()
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true,
    transform: true, 
    disableErrorMessages: false, 
    exceptionFactory: (errors) => {
      const message = errors.map(error => `${error.property} - ${Object.values(error.constraints).join(', ')}`);
      return new BadRequestException(message);
    },
  }));

  const appPort = 3001
  await app.listen(appPort,()=>{
    console.log("Running on port: ",appPort);
  });
}
bootstrap();
