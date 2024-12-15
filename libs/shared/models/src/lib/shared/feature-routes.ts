import { Feature } from './features.enum';

export const FeatureRoutes = new Map<Feature, string>([
  [Feature.Login, 'login'],
  [Feature.Logout, 'logout'],

  [Feature.Admin, 'admin'],
  [Feature.UserManagement, 'user-management'],

  [Feature.ProjectOwner, 'project-owner'],
  [Feature.MyProjects, 'projects'],
  [Feature.CreateProject, 'create-project'],

  [Feature.Reviewer, 'reviewer'],
  [Feature.AssignedProjects, 'projects'],

  [Feature.Account, 'account'],
]);
