import { Module } from '@nestjs/common';
import { ExecutorService } from './executor.service';
import { ExecutorController } from './executor.controller';
import { ExecutorEntity } from './entities/executor.entity';
import { TaskEntity } from 'src/task/entities/task.entity';

@Module({
  controllers: [ExecutorController],
  providers: [ExecutorService],
})
export class ExecutorModule {}
