import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExecutorDto } from './dto/create-executor.dto';
import { TaskService } from 'src/task/task.service';
import { Executor } from '@prisma/client';

@Injectable()
export class ExecutorService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly taskService: TaskService,
  ) {}

  async findByTaskId(id: string) {
    // const task = await this.taskService.findById(id);
    // if (!task) {
    //   throw new NotFoundException('Task not found');
    // }
    // return task.executors;
  }

  async create(
    task_id: string,
    createExecutorDto: CreateExecutorDto,
  ): Promise<Executor> {
    const task = await this.taskService.findById(task_id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const executor = this.prismaService.executor.create({
      data: { ...createExecutorDto, tasks: { connect: { id: task_id } } },
    });

    return executor;
  }
}
