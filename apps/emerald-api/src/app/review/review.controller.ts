import { Controller, Get, Param, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Request } from 'express';
import { Review } from '@prisma/client';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get()
  getReviews(@Req() request: Request): Promise<Review[]> {
    const userId = request['jwt'].sub;
    return this.reviewService.reviews({
      where: {
        userId: userId,
      },
    });
  }

  @Get(':userId:checklistId')
  getReview(
    @Param('userId') userId: string,
    @Param('checklistId') checklistId: string
  ): Promise<Review> {
    return this.reviewService.review({
      userId_checklistId: {
        userId: userId,
        checklistId: checklistId,
      },
    });
  }
}
