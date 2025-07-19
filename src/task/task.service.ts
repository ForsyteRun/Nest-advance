import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskRequestDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Task[]> {
    return await this.prismaService.task.findMany({
      orderBy: { cretedAt: 'desc' },
      include: { executors: true, poster: true, reviews: true },
    });
  }

  async findById(id: string): Promise<Task> {
    const task = await this.prismaService.task.findUnique({
      where: { id },
      include: { executors: true, poster: true, reviews: true },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async create(dto: CreateTaskRequestDto): Promise<Task> {
    const { executors, poster, ...rest } = dto;

    const task = await this.prismaService.task.create({
      data: {
        ...rest,
        executors: {
          create: executors.map((executor) => ({ name: executor.name })),
        },
        poster: poster ? { create: { url: poster } } : undefined,
      },
    });

    return task;
  }

  async updateFullTask(id: string, dto: UpdateTaskDto): Promise<boolean> {
    const task = await this.findById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.prismaService.task.update({
      where: { id: task.id },
      data: {
        ...dto,
      },
    });

    return true;
  }

  async delete(id: string): Promise<boolean> {
    await this.prismaService.task.delete({
      where: { id },
    });

    return true;
  }
}
