import { type RouteConfig } from '@react-router/dev/routes';
import authRoutes from './routes/auth/routes';
import demoRoutes from './routes/demo/routes';
import publicRoutes from './routes/public/routes';

export default [
  // Demo
  ...demoRoutes,
  // Public
  ...publicRoutes,
  // Auth
  ...authRoutes,
] satisfies RouteConfig;
