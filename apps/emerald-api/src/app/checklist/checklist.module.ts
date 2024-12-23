import { Module } from '@nestjs/common';
import { ChecklistController } from './checklist.controller';
import { ChecklistService } from './checklist.service';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [ChecklistController],
  providers: [ChecklistService, PrismaService],
})
export class ChecklistModule {}
