import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';
import { Checklist } from '@emerald/models';
import { ResultService } from '../result/result.service';
import { ChecklistService } from '../checklist/checklist.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService, private resultService: ResultService, private checklistService: ChecklistService) {}

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
    return this.checklistService.checklists(params);
  }
}
