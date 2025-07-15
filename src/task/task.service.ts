import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor() {}

  async findAll() {}

  async findById(id: string) {}

  async create(dto: CreateTaskDto) {}

  async updateFullTask(id: string, dto: UpdateTaskDto): Promise<boolean> {
    return true;
  }

  async delete(id: string) {}
}
