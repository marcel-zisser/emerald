import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';
import { ResultService } from '../result/result.service';
import { Checklist, CriteriaSummary, ReviewStatus, ReviewSummary } from '@emerald/models';

type ReviewWithRelations = Prisma.ReviewGetPayload<{
  include: { reviewResults: true };
}>;

type ChecklistWithReviews = Prisma.ChecklistGetPayload<{
  include: { reviews: { include: { reviewResults: true } } };
}>;

@Injectable()
export class ChecklistService {

  constructor(
    private prisma: PrismaService,
    private resultService: ResultService
  ) {
  }

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
            reviewResults: true
          }
        }
      }
    });

    return checklists.map((checklist) => {
      return this.mapPrismaChecklist(checklist);
    });
  }

  /**
   * Gets a specific checklist from the database
   * @param checklistWhereUniqueInput criteria to find checklist
   */
  async checklist(
    checklistWhereUniqueInput: Prisma.ChecklistWhereUniqueInput
  ): Promise<Checklist | null> {
    const checklist = await this.prisma.checklist.findUnique({
      where: checklistWhereUniqueInput,
      include: {
        reviews: {
          include: {
            reviewResults: true
          }
        }
      }
    });

    return this.mapPrismaChecklist(checklist);
  }

  /**
   * Creates a new checklist
   * @param data the checklist to be created
   */
  async createChecklist(data: Prisma.ChecklistCreateInput): Promise<Checklist> {
    const checklist = await this.prisma.checklist.create({
      data,
      include: {
        reviews: {
          include: { reviewResults: true }
        }
      }
    });

    await this.resultService.createDefaultResults(checklist);

    return this.mapPrismaChecklist(checklist);
  }

  /**
   * Edits an already existing checklist
   * @param params update params of the checklist
   */
  async updateChecklist(params: {
    where: Prisma.ChecklistWhereUniqueInput;
    data: Prisma.ChecklistUpdateInput;
  }): Promise<Checklist> {
    const { where, data } = params;
    const checklist = await this.prisma.checklist.update({
      data,
      where,
      include: {
        reviews: {
          include: { reviewResults: true }
        }
      }
    });

    return this.mapPrismaChecklist(checklist);
  }

  /**
   * Deletes an already existing checklist
   * @param where delete criteria
   */
  async deleteChecklist(
    where: Prisma.ChecklistWhereUniqueInput
  ): Promise<Checklist> {
    const checklist = await this.prisma.checklist.delete({
      where,
      include: {
        reviews: {
          include: { reviewResults: true }
        }
      }
    });

    return this.mapPrismaChecklist(checklist);
  }

  private getReviewSummary(reviews: ReviewWithRelations[]): ReviewSummary {
    const reviewSummary: ReviewSummary = { completed: 0, uncompleted: 0 };

    reviews.forEach((review) => {
      const status = this.resultService.getReviewStatus(review.reviewResults);

      if (status === ReviewStatus.InProgress || status === ReviewStatus.NotStarted) {
        reviewSummary.uncompleted++;

      } else {
        reviewSummary.completed++;
      }
    });

    return reviewSummary;
  }

  private getCriterionSummary(reviews: ReviewWithRelations[]): CriteriaSummary {
    const criteriaSummary: CriteriaSummary = { passed: 0, failed: 0, TBD: 0 };

    reviews.forEach((review) => {
      const summary = this.resultService.getCriterionSummary(review.reviewResults);

      criteriaSummary.passed += summary.passed;
      criteriaSummary.failed += summary.failed;
      criteriaSummary.TBD += summary.TBD;
    });

    return criteriaSummary;
  }

  private mapPrismaChecklist(checklist: ChecklistWithReviews): Checklist {
    return {
      uuid: checklist.uuid,
      title: checklist.title,
      description: checklist.description,
      ownerId: checklist.ownerId,
      criteriaSummary: this.getCriterionSummary(checklist.reviews),
      reviewSummary: this.getReviewSummary(checklist.reviews)
    } satisfies Checklist;
  }
}
