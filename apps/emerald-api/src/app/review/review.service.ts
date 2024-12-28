import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';
import { CriterionStatus, Review, ReviewResult, ReviewStatus } from '@emerald/models';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

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
        User: true
      }
    });

    return reviews.map(review => {
      return {
        uuid: review.uuid,
        status: ReviewStatus.Done,
        user: {
          uuid: review.userId,
          firstName: review.User.firstName,
          lastName: review.User.lastName,
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
        User: true
      }
    });

    return {
      uuid: review.uuid,
      status: ReviewStatus.Done,
      user: {
        uuid: review.userId,
        firstName: review.User.firstName,
        lastName: review.User.lastName,
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
