import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { TaskService } from 'src/task/task.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly taskService: TaskService,
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    const task = await this.taskService.findById(dto.taskId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const review = await this.prismaService.review.create({
      data: { text: dto.text, task: { connect: { id: task.id } } },
    });

    return review;
  }
}
