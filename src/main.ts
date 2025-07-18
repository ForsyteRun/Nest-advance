import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterseptor } from './common/interseptors/response.interseptor';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(LoggerMiddleware);
  app.useGlobalInterceptors(new ResponseInterseptor());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
