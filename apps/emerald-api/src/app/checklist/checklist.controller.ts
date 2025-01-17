import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Roles } from '../authentication/decorators/roles.decorator';
import { Prisma } from '@prisma/client';
import { Checklist, CreateChecklistRequest, Role } from '@emerald/models';
import { Request } from 'express';
import { ChecklistService } from './checklist.service';

@Controller('checklist')
export class ChecklistController {
  constructor(private checklistService: ChecklistService) {
  }

  @Get()
  getChecklists(@Req() request: Request): Promise<Checklist[]> {
    const ownerId = request['jwt'].sub;
    return this.checklistService.checklists({
      where: {
        ownerId: ownerId
      }
    });
  }

  @Get(':uuid')
  getChecklist(@Param('uuid') uuid: string): Promise<Checklist> {
    return this.checklistService.checklist({ uuid: uuid });
  }

  @Roles(Role.Admin, Role.ProjectOwner)
  @Post('')
  createChecklist(
    @Req() request: Request,
    @Body() body: CreateChecklistRequest
  ): Promise<Checklist> {
    const checklist = {
      title: body.title,
      description: body.description,
      owner: {
        connect: {
          uuid: request['jwt'].sub
        }
      },
      reviews: {
        createMany: {
          data: body.reviewerIds.map((reviewerId) => (
            { userId: reviewerId, dueDate: body.dueDate }
          ))
        }
      },
      groups: {
        create: body.criteriaGroups.map((group) => ({
          title: group.title,
          description: group.description,
          criteria: {
            create: group.criteria.map((criterion) => ({
              description: criterion.description,
              type: criterion.criterionType
            }))
          }
        }))
      }
    } satisfies Prisma.ChecklistCreateInput;

    return this.checklistService.createChecklist(checklist);
  }

  // @Roles(Role.Admin, Role.ProjectOwner)
  // @Put('')
  // editChecklist(
  //   @Req() request: Request,
  //   @Body() project: Checklist
  // ): Promise<Checklist> {
  //   if (
  //     request['jwt'].role != Role.Admin &&
  //     request['jwt'].sub != project.uuid
  //   ) {
  //     throw new UnauthorizedException();
  //   }
  //
  //   return this.checklistService.updateChecklist({
  //     where: { uuid: project.uuid },
  //     data: project,
  //   });
  // }

  @Roles(Role.Admin, Role.ProjectOwner)
  @Delete(':uuid')
  deleteChecklist(@Param('uuid') uuid: string): Promise<Checklist> {
    return this.checklistService.deleteChecklist({ uuid: uuid });
  }
}
