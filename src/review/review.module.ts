import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewEntity } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from 'src/task/task.service';
import { TaskEntity } from 'src/task/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity, TaskEntity])],
  controllers: [ReviewController],
  providers: [ReviewService, TaskService],
})
export class ReviewModule {}
