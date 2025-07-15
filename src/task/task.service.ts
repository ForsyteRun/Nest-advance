import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { async } from 'rxjs';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ExecutorEntity } from 'src/executor/entities/executor.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    @InjectRepository(ExecutorEntity)
    private readonly executorRepository: Repository<ExecutorEntity>,
  ) {}

  async findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.find({
      order: { createdAt: 'DESC' },
      relations: {
        reviews: true,
        executors: true,
      },
    });
  }

  async findById(id: string): Promise<TaskEntity | null> {
    const task = await this.taskRepository.findOne({
      where: { id: Number(id) },
      relations: {
        reviews: true,
        executors: true,
      },
    });

    if (!task) {
      throw new NotAcceptableException('Задачи не существует');
    }

    return task;
  }

  async create(dto: CreateTaskDto): Promise<TaskEntity> {
    const { title, note, executors } = dto;

    const executorEntities: ExecutorEntity[] = [];

    if (executors && executors.length) {
      for (const ex of executors) {
        const createdExecutor = this.executorRepository.create(ex);
        const savedExecutor =
          await this.executorRepository.save(createdExecutor);
        executorEntities.push(savedExecutor);
      }
    }

    const createdTask = this.taskRepository.create({
      title,
      note,
      executors: executorEntities,
    });

    const savedTask = this.taskRepository.save(createdTask);

    return savedTask;
  }

  async updateFullTask(id: string, dto: UpdateTaskDto): Promise<boolean> {
    const task = await this.findById(id);

    if (!task) {
      throw new NotAcceptableException('Задачи не существует');
    }

    Object.assign(task, dto);

    await this.taskRepository.save(task);

    return true;
  }

  async delete(id: string): Promise<boolean> {
    const task = await this.findById(id);

    if (!task) {
      throw new NotAcceptableException('Задачи не существует');
    }

    await this.taskRepository.remove(task);

    return true;
  }
}
