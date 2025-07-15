import { Global, Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { ExecutorService } from 'src/executor/executor.service';
import { ExecutorEntity } from 'src/executor/entities/executor.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, ExecutorEntity])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
