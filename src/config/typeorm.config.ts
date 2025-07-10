import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeormConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.getOrThrow<string>('POSTGRES_HOST'),
  port: configService.getOrThrow<number>('POSTGRES_PORT'),
  username: configService.getOrThrow<string>('POSTGRES_USER'),
  password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
  database: configService.getOrThrow<string>('POSTGRES_DB'),
  autoLoadEntities: true,
  synchronize: true,
});
