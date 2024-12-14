import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.users({});
  }

  @Get(':uuid')
  getUser(@Param('uuid') uuid: string): Promise<User> {
    return this.userService.user({ uuid: uuid });
  }

  @Post('')
  createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put(':uuid')
  editUser(@Param('uuid') uuid: string, @Body() user: User): Promise<User> {
    return this.userService.updateUser({
      where: { uuid: uuid },
      data: user,
    });
  }

  @Delete(':uuid')
  deleteUser(@Param('uuid') uuid: string): Promise<User> {
    return this.userService.deleteUser({ uuid: uuid });
  }
}
