import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import {
  JwtTokenInformation,
  Role,
} from '@emerald/models';
import { jwtDecode } from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '@emerald/dialog';
import { first } from 'rxjs';
import { adminRoutes, checklistOwnerRoutes, reviewerRoutes } from './route-permission';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthenticationService);
  const dialog = inject(MatDialog);
  const router = inject(Router);

  const token = authService.getToken();
  let allowed = false;

  if (route.url.toString() === '') {
    return true;
  }

  if (token) {
    const userRole = jwtDecode<JwtTokenInformation>(token).role;



    switch (userRole) {
      case Role.Admin:
        allowed = adminRoutes.some( allowedRoute => route.url.toString().startsWith(allowedRoute));
        break;
      case Role.ProjectOwner:
        allowed = checklistOwnerRoutes.some( allowedRoute => route.url.toString().startsWith(allowedRoute));
        break;
      case Role.Reviewer:
        allowed = reviewerRoutes.some( allowedRoute => route.url.toString().startsWith(allowedRoute));
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
