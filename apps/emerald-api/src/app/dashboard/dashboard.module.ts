import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { PrismaService } from '../../prisma.service';
import { ResultService } from '../result/result.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, PrismaService, ResultService],
})
export class DashboardModule {}
