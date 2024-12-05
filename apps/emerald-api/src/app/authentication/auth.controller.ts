import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { LoginRequest, LoginResponse, RefreshTokenResponse, User } from '@emerald/models';
import { AuthService } from './auth.service';
import { Public } from './auth.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authenticationService: AuthService) {}

  @Public()
  @Post('/register')
  async register(@Body() user: User): Promise<void> {
    await this.authenticationService.createUser(user);
  }

  @Public()
  @Post('/login')
  login(
    @Body() request: LoginRequest,
    @Res({ passthrough: true }) response: Response
  ): Promise<LoginResponse> {
    return  this.authenticationService.login(request, response);
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
