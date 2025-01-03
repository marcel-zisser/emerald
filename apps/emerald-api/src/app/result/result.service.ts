import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CriteriaSummary, CriterionStatus, ReviewStatus, ReviewSummary } from '@emerald/models';
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

  getReviewStatus(results: ReviewResult[]): ReviewStatus {
    let completed = 0;

    results.forEach((reviewResult) => {
      if (reviewResult.status !== CriterionStatus.TBD) {
        completed++;
      }
    });

    if (completed === 0) {
      return ReviewStatus.NotStarted
    } else if (completed === results.length) {
      return ReviewStatus.Complete;
    } else {
      return ReviewStatus.InProgress;
    }
  }
}
