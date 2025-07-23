import { type INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from 'src/config/swigger.config';

export const setupSwagger = (app: INestApplication) => {
  const config = swaggerConfig();

  const document = () =>
    SwaggerModule.createDocument(app, config, {
      deepScanRoutes: true,
    });

  SwaggerModule.setup('/docs', app, document, {
    jsonDocumentUrl: '/swagger.json',
    yamlDocumentUrl: '/docs-yaml',
    customSiteTitle: 'Nest advince',
  });
};
