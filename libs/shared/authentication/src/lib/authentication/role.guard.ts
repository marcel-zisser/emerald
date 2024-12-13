import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import {
  Feature,
  FeatureRoutes,
  JwtTokenInformation,
  Roles,
} from '@emerald/models';
import { jwtDecode } from 'jwt-decode';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);

  const token = authService.getToken();
  let allowed = false;

  if (token) {
    const userRole = jwtDecode<JwtTokenInformation>(token).role;

    switch (userRole) {
      case Roles.Admin:
        allowed = route.url[0].path === FeatureRoutes.get(Feature.Admin);
        break;
      case Roles.ProjectOwner:
        allowed = route.url[0].path === FeatureRoutes.get(Feature.ProjectOwner);
        break;
      case Roles.Reviewer:
        allowed = route.url[0].path === FeatureRoutes.get(Feature.Reviewer);
        break;
    }
  }

  console.log(state);

  return allowed;
};
