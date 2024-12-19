import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtTokenInformation, Role } from '@emerald/models';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';
import { ROLES_KEY } from './decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, @Inject() private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.authService.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const userRole = jwtDecode<JwtTokenInformation>(token).role;

    return requiredRoles.some((role) => role === userRole);
  }
}
