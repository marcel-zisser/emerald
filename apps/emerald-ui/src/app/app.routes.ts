import { Route } from '@angular/router';
import { LoginComponent } from '@emerald/components';
import {
  Feature,
  FeatureRoutes,
  JwtTokenInformation,
  Roles,
} from '@emerald/models';
import {
  authenticationGuard,
  AuthenticationService,
  roleGuard,
} from '@emerald/authentication';
import { AdminComponent, UserTableComponent } from '@emerald/admin';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ProjectOwnerComponent } from '@emerald/project-owner';
import { ReviewerComponent } from '@emerald/reviewer';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => roleBasedRedirect(),
  },
  {
    path: FeatureRoutes.get(Feature.Login),
    component: LoginComponent,
    title: getPageTitle(Feature.Login),
  },
  {
    path: FeatureRoutes.get(Feature.Admin),
    component: AdminComponent,
    title: getPageTitle(Feature.Admin),
    canActivate: [authenticationGuard, roleGuard],
    children: [
      {
        path: FeatureRoutes.get(Feature.UserManagement),
        component: UserTableComponent,
        title: getPageTitle(Feature.UserManagement),
      },
    ],
  },
  {
    path: FeatureRoutes.get(Feature.ProjectOwner),
    component: ProjectOwnerComponent,
    title: getPageTitle(Feature.ProjectOwner),
    canActivate: [authenticationGuard, roleGuard],
  },
  {
    path: FeatureRoutes.get(Feature.Reviewer),
    component: ReviewerComponent,
    title: getPageTitle(Feature.Reviewer),
    canActivate: [authenticationGuard, roleGuard],
  },
];

/**
 * Redirects the default route based on the user role
 */
function roleBasedRedirect(): string {
  const authService = inject(AuthenticationService);
  const token = authService.getToken();

  if (token) {
    const userRole = jwtDecode<JwtTokenInformation>(token).role;

    switch (userRole) {
      case Roles.Admin:
        return FeatureRoutes.get(Feature.Admin) ?? '';
      case Roles.ProjectOwner:
        return FeatureRoutes.get(Feature.ProjectOwner) ?? '';
      case Roles.Reviewer:
        return FeatureRoutes.get(Feature.Reviewer) ?? '';
    }
  }

  return FeatureRoutes.get(Feature.Login) ?? '';
}

/**
 * Combines the page title with the Emerald ending
 * @param title The title of the specific page
 */
function getPageTitle(title: string): string {
  return `${title} | Emerald`;
}
