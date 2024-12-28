import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';
import { CriteriaSummary, DashboardChecklist, ReviewSummary } from '@emerald/models';
import { ResultService } from '../result/result.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService, private resultService: ResultService) {}

  /**
   * Gets all checklists from the database
   */
  async checklists(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ChecklistWhereUniqueInput;
    where?: Prisma.ChecklistWhereInput;
    orderBy?: Prisma.ChecklistOrderByWithRelationInput;
    include?: Prisma.ChecklistInclude;
  }): Promise<DashboardChecklist[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const checklists = await this.prisma.checklist.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        reviews: {
          include: {
            reviewResults: true,
          },
        },
      },
    });

    return checklists.map((checklist) => {
      const criteriaSummary: CriteriaSummary = { passed: 0, failed: 0, TBD: 0 };

      checklist.reviews.forEach((review) => {
        const summary = this.resultService.getCriterionSummary(review.reviewResults)

        criteriaSummary.passed += summary.passed;
        criteriaSummary.failed += summary.failed;
        criteriaSummary.TBD += summary.TBD;
      });

      const reviewSummary: ReviewSummary = { completed: 0, uncompleted: 0 };

      checklist.reviews.forEach((review) => {
        const summary = this.resultService.getReviewSummary(review.reviewResults);

        reviewSummary.completed += summary.completed;
        reviewSummary.uncompleted += summary.uncompleted;
      });

      return {
        uuid: checklist.uuid,
        title: checklist.title,
        description: checklist.description,
        ownerId: checklist.ownerId,
        criteriaSummary: criteriaSummary,
        reviewSummary: reviewSummary,
      } satisfies DashboardChecklist;
    });
  }
}
