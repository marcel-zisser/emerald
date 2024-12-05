import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginRequest, LoginResponse, RefreshTokenResponse, User } from '@club-master/models';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User)
              private userRepository: Repository<User>,
              private readonly jwtService: JwtService) {}

  /**
   * Registers a user
   * @param user the user to register
   */
  async createUser(user: User): Promise<void> {
    user.password = await bcrypt.hash(user.password, 10);
    console.log(user);
    const createdUser = this.userRepository.create(user);
    await this.userRepository.save(createdUser);
  }

  /**
   * Checks if the credentials of the user are correct and returns a JWT token
   * in case of success
   * @param request the user credentials
   * @param response the response object to set the refreshToken
   * @returns {Promise<LoginResponse>} Returns JWT token on success
   */
  async login(request: LoginRequest, response: Response): Promise<LoginResponse> {
    const user = await this.userRepository.findOneBy({ username: request.username });
    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordCorrect = await bcrypt.compare(request.password, user.password);
    if(!passwordCorrect) {
      throw new UnauthorizedException();
    }

    const refreshToken = await this.generateRefreshToken(user.userId);
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      accessToken: await this.generateAccessToken(user.userId)
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
    if(!valid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const userId = this.jwtService.decode(refreshToken).sub;
    return {
      accessToken: await this.generateAccessToken(userId),
    };
  }

  /**
   * Method to generate a short-lived access-token
   * @param userId the user's ID for whom the token is generated
   * @returns {string} The generated access-token
   */
  private async generateAccessToken(userId: string): Promise<string> {
    const payload = { sub: userId };
    return this.jwtService.signAsync(payload)
  }

  /**
   * Method to generate a long-lived refresh-token
   * @param userId the user's ID for whom the token is generated   * @returns {string} The generated refresh-token
   */
  private async generateRefreshToken(userId: string): Promise<string> {
    const payload = { sub: userId };
    return this.jwtService.signAsync(payload, { expiresIn: '7d' })
  }

  /**
   * Validates the given refresh token
   * @param token the refresh token to validate
   * @returns {any} a value if successful, null otherwise
   */
  private async validateRefreshToken(token: string): Promise<any> {
    try {
      return this.jwtService.verifyAsync(token);
    } catch (e) {
      return null;
    }
  }
}
