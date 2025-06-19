import { Injectable, NotFoundException } from '@nestjs/common';

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
}
