import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createReview(@Body() data: CreateReviewDto) {
    return this.reviewService.create(data);
  }
}
