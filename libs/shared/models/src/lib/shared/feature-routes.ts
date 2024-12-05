import { Feature } from './features.enum';

export const FeatureRoutes = new Map<Feature, string>([
  [Feature.Dashboard, ''],
  [Feature.Login, 'login'],
  [Feature.Logout, 'login'],
  [Feature.UserSettings, 'user'],
]);
