import { Feature, FeatureRoutes } from '@emerald/models';

const baseRoutes: string[] = [
  FeatureRoutes.get(Feature.Account) ?? '',
  FeatureRoutes.get(Feature.Login) ?? '',
  FeatureRoutes.get(Feature.Logout) ?? ''
];

export const reviewerRoutes: string[] = [
  '',
  ...baseRoutes,
  FeatureRoutes.get(Feature.Reviews) ?? ''

];

export const checklistOwnerRoutes: string[] = [
  ...reviewerRoutes,
  FeatureRoutes.get(Feature.Projects) ?? '',
  FeatureRoutes.get(Feature.CreateProject) ?? '',
  FeatureRoutes.get(Feature.ProjectSummary) ?? ''
];

export const adminRoutes: string[] = [
  ...baseRoutes,
  FeatureRoutes.get(Feature.UserManagement) ?? ''
];
