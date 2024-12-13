import { Controller, Get, Param } from '@nestjs/common';
import { User } from '@emerald/models';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {
  }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':uuid')
  getUser(@Param('uuid') uuid: string): Promise<User> {
    return this.userService.getUser(uuid);
  }
}
