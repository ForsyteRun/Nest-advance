import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = () => {
  return new DocumentBuilder()
    .setTitle('Nest advince')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('nest')
    .addBearerAuth()
    .build();
};
