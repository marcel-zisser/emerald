import {
  Controller,
  Get,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../authentication/decorators/roles.decorator';
import { Checklist, Role } from '@emerald/models';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Roles(Role.ProjectOwner, Role.Admin)
  @Get()
  getChecklists(@Req() request: Request): Promise<Checklist[]> {
    const ownerId = request['jwt'].sub;
    return this.dashboardService.checklists({
      take: 5,
      where: {
        ownerId: ownerId,
      },
    });
  }
}
