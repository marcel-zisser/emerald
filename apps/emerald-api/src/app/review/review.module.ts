import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ResultService } from '../result/result.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, PrismaService, ResultService],
})
export class ReviewModule {}
