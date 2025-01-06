import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { PrismaService } from '../../prisma.service';
import { ResultService } from '../result/result.service';
import { ChecklistService } from '../checklist/checklist.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, PrismaService, ResultService, ChecklistService],
})
export class DashboardModule {}
