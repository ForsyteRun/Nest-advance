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

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<TaskEntity | null> {
    const task = await this.taskRepository.findOneBy({ id: Number(id) });

    if (!task) {
      throw new NotAcceptableException('Задачи не существует');
    }

    return task;
  }

  async create(data: CreateTaskDto): Promise<TaskEntity> {
    const createdTask = this.taskRepository.create(data);
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
