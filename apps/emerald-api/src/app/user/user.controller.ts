import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { ChangePasswordRequest, Role } from '@emerald/models';
import { Roles } from '../authentication/decorators/roles.decorator';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService
  ) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.users({});
  }

  @Get(':uuid')
  getUser(@Param('uuid') uuid: string): Promise<User> {
    return this.userService.user({ uuid: uuid });
  }

  @Roles(Role.Admin)
  @Post('')
  createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put('')
  editUser(@Req() request: Request, @Body() user: User): Promise<User> {
    if (request['jwt'].role != Role.Admin && request['jwt'].sub != user.uuid) {
      throw new UnauthorizedException();
    }

    console.log(user);

    return this.userService.updateUser({
      where: { uuid: user.uuid },
      data: user,
    });
  }

  @Patch('')
  async changePassword(
    @Req() request: Request,
    @Body() body: ChangePasswordRequest
  ): Promise<User> {
    if (body.password !== body.confirmPassword) {
      throw new BadRequestException();
    }

    const user = await this.prisma.user.findUnique({
      where: { uuid: request['jwt'].sub },
      omit: { password: false },
    });

    if (!user) {
      throw new BadRequestException();
    }

    const passwordCorrect = await bcrypt.compare(
      body.currentPassword,
      user.password
    );
    if (!passwordCorrect) {
      throw new UnauthorizedException();
    }

    return this.userService.updateUser({
      where: { uuid: request['jwt'].sub },
      data: { password: await bcrypt.hash(body.password, 10) },
    });
  }

  @Roles(Role.Admin)
  @Delete(':uuid')
  deleteUser(@Param('uuid') uuid: string): Promise<User> {
    return this.userService.deleteUser({ uuid: uuid });
  }
}
