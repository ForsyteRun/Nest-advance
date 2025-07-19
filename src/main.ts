import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterseptor } from './common/interseptors/response.interseptor';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AllExceptionsFilter } from './common/filters/all-exeptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TaskModule } from './task/task.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest advince')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('nest')
    .addBearerAuth()
    .build();

  const document = () =>
    SwaggerModule.createDocument(app, config, {
      include: [TaskModule],
      deepScanRoutes: true,
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    });

  SwaggerModule.setup('/docs', app, document, {
    jsonDocumentUrl: '/swagger.json',
    yamlDocumentUrl: '/docs-yaml',
    customSiteTitle: 'Nest advince',
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(LoggerMiddleware);
  app.useGlobalInterceptors(new ResponseInterseptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
