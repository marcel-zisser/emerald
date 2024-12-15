import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  JwtTokenInformation,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  Roles,
} from '@emerald/models';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  /**
   * Checks if the credentials of the user are correct and returns a JWT token
   * in case of success
   * @param request the user credentials
   * @param response the response object to set the refreshToken
   * @returns {Promise<LoginResponse>} Returns JWT token on success
   */
  async login(
    request: LoginRequest,
    response: Response
  ): Promise<LoginResponse> {
    const user = await this.userService.user({ email: request.email });
    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordCorrect = await bcrypt.compare(request.password, user.password);
    if (!passwordCorrect) {
      throw new UnauthorizedException();
    }

    const refreshToken = await this.generateRefreshToken(user);
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'strict',
    });

    return {
      accessToken: await this.generateAccessToken(user),
    };
  }

  /**
   * Checks the provided refresh token and generates a new access token if valid
   * @param request The request containing the refresh token
   * @returns {Promise<RefreshTokenResponse>} Returns JWT token on success
   */
  async refresh(request: Request): Promise<RefreshTokenResponse> {
    const refreshToken = request.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const valid = this.validateRefreshToken(refreshToken);
    if (!valid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = {
      uuid: this.jwtService.decode(refreshToken).sub,
      firstName: this.jwtService.decode(refreshToken).firstName,
      lastName: this.jwtService.decode(refreshToken).lastName,
      role: this.jwtService.decode(refreshToken).role,
      email: '',
      password: '',
    } satisfies User;

    return {
      accessToken: await this.generateAccessToken(user),
    };
  }

  /**
   * Method to generate a short-lived access-token
   * @param user the user for whom the token is generated
   * @returns {string} The generated access-token
   */
  private async generateAccessToken(user: User): Promise<string> {
    const payload = {
      sub: user.uuid,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role as Roles,
    } satisfies JwtTokenInformation;
    return this.jwtService.signAsync(payload);
  }

  /**
   * Method to generate a long-lived refresh-token
   * @param user the user for whom the token is generated   * @returns {string} The generated refresh-token
   */
  private async generateRefreshToken(user: User): Promise<string> {
    const payload = {
      sub: user.uuid,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role as Roles,
    } satisfies JwtTokenInformation;

    return this.jwtService.signAsync(payload, { expiresIn: '7d' });
  }

  /**
   * Validates the given refresh token
   * @param token the refresh token to validate
   * @returns {any} a value if successful, null otherwise
   */
  private async validateRefreshToken(token: string): Promise<any> {
    try {
      return this.jwtService.verifyAsync(token);
    } catch (error) {
      return null;
    }
  }
}
