import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly taskService: TaskService,
  ) {}

  async create(dto: CreateReviewDto): Promise<ReviewEntity> {
    const task = await this.taskService.findById(dto.taskId);

    if (!task?.id) {
      throw new NotAcceptableException('Задачи не существует');
    }

    const review = this.reviewRepository.create({ review: dto.review, task });
    const savedTask = this.reviewRepository.save(review);

    return savedTask;
  }
}
