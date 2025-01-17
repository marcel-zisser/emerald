import { Route } from '@angular/router';
import { LoginComponent } from '@emerald/components';
import { Feature, FeatureRoutes } from '@emerald/models';
import { authenticationGuard, roleGuard } from '@emerald/authentication';
import { UserTableComponent } from '@emerald/admin';
import { AccountComponent } from '@emerald/account';
import { DashboardComponent } from '@emerald/dashboard';
import {
  ProjectComponent,
  CreateProjectComponent,
  ProjectSummaryComponent,
} from '@emerald/project';
import { ReviewComponent, ReviewFormComponent } from '@emerald/review';

export const appRoutes: Route[] = [
  {
    path: FeatureRoutes.get(Feature.Login),
    component: LoginComponent,
    title: getPageTitle(Feature.Login),
  },
  {
    path: '',
    component: DashboardComponent,
    title: getPageTitle(Feature.Dashboard),
    canActivate: [authenticationGuard, roleGuard],
  },
  {
    path: FeatureRoutes.get(Feature.UserManagement),
    component: UserTableComponent,
    title: getPageTitle(Feature.UserManagement),
    canActivate: [authenticationGuard, roleGuard],
  },
  {
    path: FeatureRoutes.get(Feature.Projects),
    component: ProjectComponent,
    title: getPageTitle(Feature.Projects),
    canActivate: [authenticationGuard, roleGuard],
  },
  {
    path: FeatureRoutes.get(Feature.CreateProject),
    component: CreateProjectComponent,
    title: getPageTitle(Feature.CreateProject),
    canActivate: [authenticationGuard, roleGuard],
  },
  {
    path: `${FeatureRoutes.get(Feature.ProjectSummary)}/:projectId`,
    component: ProjectSummaryComponent,
    title: getPageTitle(Feature.ProjectSummary),
    canActivate: [authenticationGuard, roleGuard],
  },
  {
    path: FeatureRoutes.get(Feature.Reviews),
    component: ReviewComponent,
    title: getPageTitle(Feature.Reviews),
    canActivate: [authenticationGuard, roleGuard],
  },
  {
    path: `${FeatureRoutes.get(Feature.Reviews)}/:reviewId`,
    component: ReviewFormComponent,
    title: getPageTitle(Feature.Reviews),
    canActivate: [authenticationGuard, roleGuard],
  },
  {
    path: FeatureRoutes.get(Feature.Account),
    component: AccountComponent,
    title: getPageTitle(Feature.Account),
    canActivate: [authenticationGuard],
  },
];

/**
 * Combines the page title with the Emerald ending
 * @param title The title of the specific page
 */
function getPageTitle(title: string): string {
  return `${title} | Emerald`;
}
