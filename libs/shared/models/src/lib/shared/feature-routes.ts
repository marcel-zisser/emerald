import { Feature } from './features.enum';

export const FeatureRoutes = new Map<Feature, string>([
  [Feature.Login, 'login'],
  [Feature.Logout, 'logout'],

  [Feature.UserManagement, 'user-management'],

  [Feature.Projects, 'checklists'],
  [Feature.CreateProject, 'create-project'],
  [Feature.ProjectSummary, 'project-summary'],

  [Feature.Reviews, 'reviews'],

  [Feature.Account, 'account'],
]);
