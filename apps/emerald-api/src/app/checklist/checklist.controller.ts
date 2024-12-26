import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Roles } from '../authentication/decorators/roles.decorator';
import { Checklist } from '@prisma/client';
import { Role } from '@emerald/models';
import { Request } from 'express';
import { ChecklistService } from './checklist.service';

@Controller('checklist')
export class ChecklistController {
  constructor(private checklistService: ChecklistService) {}

  @Get()
  getChecklists(@Req() request: Request): Promise<Checklist[]> {
    const ownerId = request['jwt'].sub;
    return this.checklistService.checklists({
      where: {
        ownerId: ownerId,
      },
    });
  }

  @Get(':uuid')
  getChecklist(@Param('uuid') uuid: string): Promise<Checklist> {
    return this.checklistService.checklist({ uuid: uuid });
  }

  // @Roles(Role.Admin, Role.ProjectOwner)
  // @Post('')
  // createChecklist(@Body() checklist: Checklist): Promise<Checklist> {
  //   return this.checklistService.createChecklist(checklist);
  // }

  @Roles(Role.Admin, Role.ProjectOwner)
  @Put('')
  editChecklist(
    @Req() request: Request,
    @Body() checklist: Checklist
  ): Promise<Checklist> {
    if (
      request['jwt'].role != Role.Admin &&
      request['jwt'].sub != checklist.uuid
    ) {
      throw new UnauthorizedException();
    }

    return this.checklistService.updateChecklist({
      where: { uuid: checklist.uuid },
      data: checklist,
    });
  }

  @Roles(Role.Admin, Role.ProjectOwner)
  @Delete(':uuid')
  deleteChecklist(@Param('uuid') uuid: string): Promise<Checklist> {
    return this.checklistService.deleteChecklist({ uuid: uuid });
  }
}
