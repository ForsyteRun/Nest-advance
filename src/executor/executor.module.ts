import { Module } from '@nestjs/common';
import { ExecutorService } from './executor.service';
import { ExecutorController } from './executor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecutorEntity } from './entities/executor.entity';
import { TaskEntity } from 'src/task/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, ExecutorEntity])],
  controllers: [ExecutorController],
  providers: [ExecutorService],
})
export class ExecutorModule {}
