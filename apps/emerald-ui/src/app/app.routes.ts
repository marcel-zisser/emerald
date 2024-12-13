import { Route } from '@angular/router';
import { LoginComponent } from '@emerald/components';
import { Feature, FeatureRoutes } from '@emerald/models';
import { authenticationGuard } from '@emerald/services';
import { AdminDashboardComponent, UserTableComponent } from '@emerald/admin';

export const appRoutes: Route[] = [
  {
    path: FeatureRoutes.get(Feature.Login),
    component: LoginComponent,
    title: Feature.Login,
  },
  {
    path: FeatureRoutes.get(Feature.Admin),
    component: AdminDashboardComponent,
    title: Feature.Admin,
    canActivate: [authenticationGuard],
    children: [
      {
        path: FeatureRoutes.get(Feature.UserManagement),
        component: UserTableComponent,
        title: Feature.UserManagement,
      },
    ],
  },
];
