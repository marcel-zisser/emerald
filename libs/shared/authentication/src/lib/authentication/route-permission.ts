import { Feature, FeatureRoutes } from '@emerald/models';

export const reviewerRoutes: string[] = [
  '',
  FeatureRoutes.get(Feature.Reviews) ?? '',
  FeatureRoutes.get(Feature.Account) ?? '',
  FeatureRoutes.get(Feature.Login) ?? '',
  FeatureRoutes.get(Feature.Logout) ?? '',
]

export const checklistOwnerRoutes: string[] = [
  ...reviewerRoutes,
  FeatureRoutes.get(Feature.Checklists) ?? '',
  FeatureRoutes.get(Feature.CreateChecklist) ?? ''
]

export const adminRoutes: string[] = [
  ...checklistOwnerRoutes,
  FeatureRoutes.get(Feature.UserManagement) ?? ''
]
