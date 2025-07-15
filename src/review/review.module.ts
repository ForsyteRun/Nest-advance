import { Module } from '@nestjs/common';
import { TaskService } from 'src/task/task.service';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, TaskService],
})
export class ReviewModule {}
