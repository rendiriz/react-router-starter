import { relative, type RouteConfig } from '@react-router/dev/routes';

const { layout, route } = relative('app/routes/auth');

export default [
  layout('layouts/auth.tsx', [
    route('login', 'pages/login.tsx'),
    route('logout', 'pages/logout.tsx'),
  ]),
] satisfies RouteConfig;
