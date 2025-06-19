import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

type Tack = {
  id: number;
  name: string;
  isCompleted: boolean;
}

@Injectable()
export class TaskService {
  private tasks: Tack[] = [
    {
      id: 1,
      name: 'task 1',
      isCompleted: false,
    },
    {
      id: 2,
      name: 'task 2',
      isCompleted: false,
    },
  ];
  findAll() {
    return this.tasks
  }

  findById(id: number) {
    const task = this.tasks.find(task => task.id === id)

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    return task
  }

  createTask(dto: CreateTaskDto) {
    const isTaskExist = this.tasks.find(task => task.name === dto.name)

    if (isTaskExist) {
      return {
        message: 'Task already exist'
      }
    }

    const newTask = {
      id: this.tasks.length + 1,
      isCompleted: false,
      name: dto.name
    }

    this.tasks.push(newTask)

    return {
      message: 'Task created successfully'
    }
  }

  updateTask(id: number, dto: UpdateTaskDto) {
    const task = this.findById(id)

    task.name = dto.name
    task.isCompleted = dto.isCompleted

    return {
      message: 'Task updated successfully'
    }
  }

  patchTask(id: number, dto: Partial<UpdateTaskDto>) {
    let task = this.findById(id)

    Object.assign(task, dto)

    return {
      message: 'Task updated successfully'
    }
  }

  deleteTask(id: number) {
    const task = this.findById(id)

    this.tasks = this.tasks.filter(t => t.id !== task.id)

    return {
      message: 'Task deleted successfully'
    }
  }
}
