import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CriteriaSummary, CriterionStatus, ReviewSummary } from '@emerald/models';
import { ReviewResult } from '@prisma/client';

@Injectable()
export class ResultService {
  constructor(private prismaService: PrismaService) {
  }

  getCriterionSummary(results: ReviewResult[]): CriteriaSummary {
    let passed = 0;
    let failed = 0;
    let tbd = 0;

    results.forEach((criterion) => {
      switch (criterion.status) {
        case CriterionStatus.Pass:
          passed += 1;
          break;
        case CriterionStatus.Fail:
          failed += 1;
          break;
        default:
          tbd += 1;
      }
    });

    return {
      passed: passed,
      failed: failed,
      TBD: tbd
    } satisfies CriteriaSummary;
  }

  getReviewSummary(results: ReviewResult[]): ReviewSummary {
    let completed = 0;
    let uncompleted = 0;

      const complete = results.every((reviewResult) => {
        return reviewResult.status !== CriterionStatus.TBD;
      });

      if (complete) {
        completed += 1;
      } else {
        uncompleted += 1;
      }

      return {
        completed: completed,
        uncompleted: uncompleted,
      } satisfies ReviewSummary;
  }
}
