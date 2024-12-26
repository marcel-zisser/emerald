import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Checklist, Prisma } from '@prisma/client';

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
  }): Promise<Checklist[]> {
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

    const aggregatedChecklists = checklists.map((checklist) => {
      const statusCounts = checklist.reviews.map((review) => {
        return review.reviewResults.reduce(
          (counts, criterion) => {
            counts[criterion.status] = (counts[criterion.status] || 0) + 1;
            return counts;
          },
          { Pass: 0, Fail: 0, TBD: 0 }
        );
      });

      return {
        uuid: checklist.uuid,
        title: checklist.title,
        description: checklist.description,
        criterionAggregates: statusCounts,
      };
    });

    console.log(aggregatedChecklists);
    return null;
  }
}
