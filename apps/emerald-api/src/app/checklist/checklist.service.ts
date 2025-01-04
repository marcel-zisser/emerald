import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Checklist, Prisma } from '@prisma/client';
import { ResultService } from '../result/result.service';

@Injectable()
export class ChecklistService {
  constructor(
    private prisma: PrismaService,
    private resultService: ResultService
  ) {}

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
    return this.prisma.checklist.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /**
   * Gets a specific checklist from the database
   * @param checklistWhereUniqueInput criteria to find checklist
   */
  async checklist(
    checklistWhereUniqueInput: Prisma.ChecklistWhereUniqueInput
  ): Promise<Checklist | null> {
    return this.prisma.checklist.findUnique({
      where: checklistWhereUniqueInput,
    });
  }

  /**
   * Creates a new checklist
   * @param data the checklist to be created
   */
  async createChecklist(data: Prisma.ChecklistCreateInput): Promise<Checklist> {
    const checklist = await this.prisma.checklist.create({
      data,
    });

    await this.resultService.createDefaultResults(checklist);

    return checklist;
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
    return this.prisma.checklist.update({
      data,
      where,
    });
  }

  /**
   * Deletes an already existing checklist
   * @param where delete criteria
   */
  async deleteChecklist(
    where: Prisma.ChecklistWhereUniqueInput
  ): Promise<Checklist> {
    return this.prisma.checklist.delete({
      where,
    });
  }
}
