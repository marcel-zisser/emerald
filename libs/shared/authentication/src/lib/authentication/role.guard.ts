import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import {
  Feature,
  FeatureRoutes,
  JwtTokenInformation,
  Roles,
} from '@emerald/models';
import { jwtDecode } from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '@emerald/dialog';
import { first } from 'rxjs';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthenticationService);
  const dialog = inject(MatDialog);
  const router = inject(Router);

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

  if (!allowed) {
    const dialogRef = dialog.open(ErrorDialogComponent, {
      data: {
        message: `You are not authorized to visit this URL!`,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(() => {
        router.navigate([''], { onSameUrlNavigation: 'reload' });
      });
  }

  return allowed;
};
