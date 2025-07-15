import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskEntity } from 'src/task/entities/task.entity';
import { ExecutorEntity } from './entities/executor.entity';
import { TaskService } from 'src/task/task.service';
import { CreateExecutorDto } from './dto/create-executor.dto';

@Injectable()
export class ExecutorService {
  constructor() {}

  async findByTaskId(id: string) {
  }

  async create(task_id: string, createExecutorDto: CreateExecutorDto) {

  }
}
