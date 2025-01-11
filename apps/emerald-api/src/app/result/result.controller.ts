import { Body, Controller, Put } from '@nestjs/common';
import { CriterionReviewRequest, ReviewResult } from '@emerald/models';
import { ResultService } from './result.service';

@Controller('result')
export class ResultController {
  constructor(private resultService: ResultService) {}

  @Put('')
  updateResult(@Body() body: CriterionReviewRequest): Promise<ReviewResult> {
    return this.resultService.updateResult({
      where: {
        reviewId_criterionId: {
          reviewId: body.reviewId,
          criterionId: body.criterionId,
        },
      },
      data: {
        status: body.status,
        comments: body.comments,
      },
    });
  }
}
