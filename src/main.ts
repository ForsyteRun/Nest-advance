import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from 'utils/swagger.utils';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
