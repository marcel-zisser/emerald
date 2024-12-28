import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Checklist, Prisma } from '@prisma/client';
import {
  CriterionStatus,
  DashboardChecklist,
} from '@emerald/models';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

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
            reviewResults: {
              select: {
                status: true,
              },
            },
          },
        },
      },
    });

    return checklists.map((checklist) => {
      let passed = 0;
      let failed = 0;
      let tbd = 0;

      checklist.reviews.forEach(
        (review) => {
          review.reviewResults.forEach((criterion) => {
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
        }
      );

      let completed = 0;
      let uncompleted = 0;

      checklist.reviews.forEach((review) => {
        const complete = review.reviewResults.every((reviewResult) => {
          return reviewResult.status !== CriterionStatus.TBD;
        });

        if (complete) {
          completed += 1;
        } else {
          uncompleted += 1;
        }
      });

      return {
        uuid: checklist.uuid,
        title: checklist.title,
        description: checklist.description,
        ownerId: checklist.ownerId,
        criterionAggregates: {
          pass: passed,
          fail:failed,
          TBD: tbd,
        },
        reviewAggregates: {
          completed: completed,
          uncompleted: uncompleted,
        },
      } satisfies DashboardChecklist;
    });
  }
}
