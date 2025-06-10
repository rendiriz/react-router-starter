import { type RouteConfig } from '@react-router/dev/routes';
import authRoutes from './auth/routes';
import demoRoutes from './demo/routes';
import publicRoutes from './public/routes';

export default [
  // Demo
  ...demoRoutes,
  // Public
  ...publicRoutes,
  // Auth
  ...authRoutes,
] satisfies RouteConfig;
