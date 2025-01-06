import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';
import { CriterionStatus, Review, ReviewResult, ReviewStatus } from '@emerald/models';
import { ResultService } from '../result/result.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService, private resultService: ResultService) {}

  /**
   * Gets all reviews from the database
   */
  async reviews(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ReviewWhereUniqueInput;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput;
  }): Promise<Review[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const reviews = await this.prisma.review.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        reviewResults: true,
        User: true,
        CheckList: {
          include: {
            owner: true
          }
        },
      }
    });

    return reviews.map(review => {
      return {
        uuid: review.uuid,
        status: this.resultService.getReviewStatus(review.reviewResults),
        assignedAt: review.assignedAt,
        user: {
          uuid: review.userId,
          firstName: review.User.firstName,
          lastName: review.User.lastName,
        },
        checklist: {
          uuid: review.CheckList.uuid,
          title: review.CheckList.title,
          description: review.CheckList.description,
          owner: {
            uuid: review.CheckList.owner.uuid,
            firstName: review.CheckList.owner.firstName,
            lastName: review.CheckList.owner.lastName
          }
        },
        results: review.reviewResults.map(result => {
          return {
            status: result.status as CriterionStatus,
            comments: result.comments
          } satisfies ReviewResult;
        }),
      } satisfies Review;
    }
    );
  }

  /**
   * Gets a specific review from the database
   * @param reviewWhereUniqueInput criteria to find review
   */
  async review(
    reviewWhereUniqueInput: Prisma.ReviewWhereUniqueInput
  ): Promise<Review | null> {
    const review = await this.prisma.review.findUnique({
      where: reviewWhereUniqueInput,
      include: {
        reviewResults: true,
        User: true,
        CheckList: {
          include: {
            owner: true
          }
        },
      }
    });

    return {
      uuid: review.uuid,
      status: this.resultService.getReviewStatus(review.reviewResults),
      assignedAt: review.assignedAt,
      user: {
        uuid: review.userId,
        firstName: review.User.firstName,
        lastName: review.User.lastName,
      },
      checklist: {
        uuid: review.CheckList.uuid,
        title: review.CheckList.title,
        description: review.CheckList.description,
        owner: {
          uuid: review.CheckList.owner.uuid,
          firstName: review.CheckList.owner.firstName,
          lastName: review.CheckList.owner.lastName
        }
      },
      results: review.reviewResults.map(result => {
        return {
          status: result.status as CriterionStatus,
          comments: result.comments
        } satisfies ReviewResult;
      }),
    } satisfies Review;
  }
}
