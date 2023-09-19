import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetting } from 'config/swagger.config';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  //Swagger 
  swaggerSetting(app);
  await app.listen(3000);
}

bootstrap();
