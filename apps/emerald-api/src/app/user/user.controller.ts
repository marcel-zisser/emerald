import { Controller, Get, Param } from '@nestjs/common';
import { User } from '@emerald/models';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @Get(':uuid')
  getMember(@Param('uuid') uuid: string): Promise<User> {
    return this.userService.getUser(uuid);
  }
}
