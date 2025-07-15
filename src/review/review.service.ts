import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ReviewEntity } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class ReviewService {
  constructor() {}

  async create(dto: CreateReviewDto) {}
}
