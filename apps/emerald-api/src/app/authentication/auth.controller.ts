import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
} from '@emerald/models';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authenticationService: AuthService,
    private readonly userService: UserService
  ) {}

  @Public()
  @Post('/register')
  async register(@Body() user: User): Promise<void> {
    await this.userService.createUser(user);
  }

  @Public()
  @Post('/login')
  login(
    @Body() request: LoginRequest,
    @Res({ passthrough: true }) response: Response
  ): Promise<LoginResponse> {
    return this.authenticationService.login(request, response);
  }

  @Public()
  @Post('/refresh')
  refresh(@Req() request: Request): Promise<RefreshTokenResponse> {
    return this.authenticationService.refresh(request);
  }

  @Public()
  @Post('/logout')
  @HttpCode(204)
  logout(@Res() res: Response): Response {
    // Clear refresh token from cookies
    res.clearCookie('refreshToken');
    return res.sendStatus(204);
  }
}
