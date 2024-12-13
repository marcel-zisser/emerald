import { Feature } from './features.enum';

export const FeatureRoutes = new Map<Feature, string>([
  [Feature.Login, 'login'],
  [Feature.Logout, 'logout'],

  [Feature.Admin, 'admin'],
  [Feature.UserManagement, 'user-management'],

  [Feature.ProjectOwner, 'project-owner'],

  [Feature.Reviewer, 'reviewer'],
]);
