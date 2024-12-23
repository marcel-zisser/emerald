import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Review, Prisma } from '@prisma/client';

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
    return this.prisma.review.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /**
   * Gets a specific review from the database
   * @param reviewWhereUniqueInput criteria to find review
   */
  async review(
    reviewWhereUniqueInput: Prisma.ReviewWhereUniqueInput
  ): Promise<Review | null> {
    return this.prisma.review.findUnique({
      where: reviewWhereUniqueInput,
    });
  }

  /**
   * Creates a new review
   * @param data the review to be created
   */
  async createReview(data: Prisma.ReviewCreateInput): Promise<Review> {
    return this.prisma.review.create({
      data,
    });
  }
}
