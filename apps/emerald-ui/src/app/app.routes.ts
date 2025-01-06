import { Route } from '@angular/router';
import { LoginComponent } from '@emerald/components';
import {
  Feature,
  FeatureRoutes,
} from '@emerald/models';
import {
  authenticationGuard,
  roleGuard,
} from '@emerald/authentication';
import { UserTableComponent } from '@emerald/admin';
import { AccountComponent } from '@emerald/account';
import { DashboardComponent } from '@emerald/dashboard';
import { ChecklistComponent, CreateChecklistComponent } from '@emerald/checklist';
import { ReviewComponent } from '@emerald/review';
import { ReviewFormComponent } from '../../../../libs/features/review/src/lib/review/review-form/review-form.component';

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
    path: FeatureRoutes.get(Feature.Checklists),
    component: ChecklistComponent,
    title: getPageTitle(Feature.Checklists),
    canActivate: [authenticationGuard, roleGuard],
  },
  {
    path: FeatureRoutes.get(Feature.CreateChecklist),
    component: CreateChecklistComponent,
    title: getPageTitle(Feature.CreateChecklist),
    canActivate: [authenticationGuard, roleGuard],
  },
  {
    path: FeatureRoutes.get(Feature.Reviews),
    component: ReviewComponent,
    title: getPageTitle(Feature.Reviews),
    canActivate: [authenticationGuard, roleGuard],
  },
  {
    path: `${FeatureRoutes.get(Feature.Reviews)}/:uuid`,
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
