import { Global, Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskEntity } from './entities/task.entity';
import { ExecutorService } from 'src/executor/executor.service';
import { ExecutorEntity } from 'src/executor/entities/executor.entity';

@Global()
@Module({
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
