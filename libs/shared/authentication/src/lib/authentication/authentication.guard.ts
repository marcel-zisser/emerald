import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Feature, FeatureRoutes } from '@emerald/models';
import { map } from 'rxjs';

export const authenticationGuard: CanActivateFn = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate([FeatureRoutes.get(Feature.Login)]); // Redirect to login if not authenticated
        return false;
      }
    })
  );
};
