import { Feature } from './features.enum';

export const FeatureRoutes = new Map<Feature, string>([
  [Feature.Login, 'login'],
  [Feature.Logout, 'logout'],

  [Feature.UserManagement, 'user-management'],

  [Feature.Checklists, 'checklists'],
  [Feature.CreateChecklist, 'create-checklist'],

  [Feature.Reviews, 'reviews'],

  [Feature.Account, 'account'],
]);
