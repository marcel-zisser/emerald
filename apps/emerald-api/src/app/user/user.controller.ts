import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { User } from '@emerald/models';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':uuid')
  getUser(@Param('uuid') uuid: string): Promise<User> {
    return this.userService.getUser(uuid);
  }

  @Post('')
  createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put(':uuid')
  editUser(@Param('uuid') uuid: string, @Body() user: User): Promise<User> {
    return this.userService.editUser(uuid, user);
  }

  @Delete(':uuid')
  deleteUser(@Param('uuid') uuid: string): Promise<User> {
    return this.userService.deleteUser(uuid);
  }
}
