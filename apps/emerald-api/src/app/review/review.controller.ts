import { Controller, Get, Query, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Request } from 'express';
import { Review } from '@emerald/models';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get()
  getReviews(@Req() request: Request, @Query('checklistId') checklistId: string): Promise<Review[]> {
    const userId = request['jwt'].sub;

    if (checklistId) {
      return this.reviewService.reviews({
        where: {
          checklistId: checklistId,
        },
      });
    } else {
      return this.reviewService.reviews({
        where: {
          userId: userId,
        },
      });
    }


  }
}
