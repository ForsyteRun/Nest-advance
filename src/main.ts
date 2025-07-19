import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

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
      deepScanRoutes: true,
    });

  SwaggerModule.setup('/docs', app, document, {
    jsonDocumentUrl: '/swagger.json',
    yamlDocumentUrl: '/docs-yaml',
    customSiteTitle: 'Nest advince',
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
