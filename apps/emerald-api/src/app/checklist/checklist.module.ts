import { Module } from '@nestjs/common';
import { ChecklistController } from './checklist.controller';
import { ChecklistService } from './checklist.service';
import { PrismaService } from '../../prisma.service';
import { ResultService } from '../result/result.service';

@Module({
  controllers: [ChecklistController],
  providers: [ChecklistService, PrismaService, ResultService],
})
export class ChecklistModule {}
