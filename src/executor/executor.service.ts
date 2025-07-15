import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/task/entities/task.entity';
import { Repository } from 'typeorm';
import { ExecutorEntity } from './entities/executor.entity';
import { TaskService } from 'src/task/task.service';
import { CreateExecutorDto } from './dto/create-executor.dto';

@Injectable()
export class ExecutorService {
  constructor(
    @InjectRepository(ExecutorEntity)
    private readonly executorRepository: Repository<ExecutorEntity>,
    private readonly taskService: TaskService,
  ) {}

  async findByTaskId(id: string) {
    const task = await this.taskService.findById(id);

    if (!task) {
      throw new NotFoundException('Задачи не существует');
    }

    return task.executors;
  }

  async create(task_id: string, createExecutorDto: CreateExecutorDto) {
    const task = await this.taskService.findById(task_id);

    if (!task) {
      throw new NotFoundException('Задачи не существует');
    }

    const executor = this.executorRepository.create({
      name: createExecutorDto.name,
      tasks: [task],
    });

    const savedExecutor = this.executorRepository.save(executor);
    return savedExecutor;
  }
}
