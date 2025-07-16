import { Module } from '@nestjs/common';
import { TaskService } from 'src/task/task.service';
import { ExecutorController } from './executor.controller';
import { ExecutorService } from './executor.service';

@Module({
  controllers: [ExecutorController],
  providers: [ExecutorService, TaskService],
})
export class ExecutorModule {}
