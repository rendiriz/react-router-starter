import { type RouteConfig } from '@react-router/dev/routes';
import authRoutes from './auth/routes';
import publicRoutes from './public/routes';

export default [
  // Public
  ...publicRoutes,
  // Auth
  ...authRoutes,
] satisfies RouteConfig;
