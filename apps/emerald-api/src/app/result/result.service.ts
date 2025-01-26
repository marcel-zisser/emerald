import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import {
  CriteriaSummary,
  CriterionStatus,
  ReviewResult,
  ReviewStatus,
} from '@emerald/models';
import { Checklist, Prisma } from '@prisma/client';

@Injectable()
export class ResultService {
  constructor(private prismaService: PrismaService) {}

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
      pending: tbd,
    } satisfies CriteriaSummary;
  }

  getReviewStatus(results: ReviewResult[]): ReviewStatus {
    let completed = 0;

    results.forEach((reviewResult) => {
      if (reviewResult.status !== CriterionStatus.Pending) {
        completed++;
      }
    });

    if (completed === 0) {
      return ReviewStatus.NotStarted;
    } else if (completed === results.length) {
      return ReviewStatus.Complete;
    } else {
      return ReviewStatus.InProgress;
    }
  }

  /**
   * Creates the default entries for all the results of all criteria of a new project
   * @param checklist the project to create the default results for
   */
  async createDefaultResults(checklist: Checklist) {
    const criteriaIds = (
      await this.prismaService.criteriaGroup.findMany({
        where: { checklistId: checklist.uuid },
        select: {
          criteria: {
            select: {
              uuid: true,
            },
          },
        },
      })
    ).flatMap((group) => group.criteria);

    const reviewIds = await this.prismaService.review.findMany({
      where: { checklistId: checklist.uuid },
      select: {
        uuid: true,
      },
    });

    for (const reviewId of reviewIds) {
      for (const criterionId of criteriaIds) {
        await this.prismaService.reviewResult.create({
          data: {
            reviewId: reviewId.uuid,
            criterionId: criterionId.uuid,
          },
        });
      }
    }
  }

  /**
   * Updates an already existing result
   * @param params update params of the result
   */
  async updateResult(params: {
    where: Prisma.ReviewResultWhereUniqueInput;
    data: Prisma.ReviewResultUpdateInput;
  }): Promise<ReviewResult> {
    const { where, data } = params;
    const updateResult = await this.prismaService.reviewResult.update({
      data: {
        ...data,
        reviewDate: new Date(),
      },
      where: where,
    });

    return {
      status: updateResult.status as CriterionStatus,
      comments: updateResult.comments,
      points: updateResult.points,
    } satisfies ReviewResult;
  }
}
