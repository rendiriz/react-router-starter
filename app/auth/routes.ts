import { relative, type RouteConfig } from '@react-router/dev/routes';

const { layout, route } = relative('app/auth');

export default [
  layout('layouts/auth.tsx', [
    route('login', 'pages/login.tsx'),
    route('search', 'actions/search.tsx'),
  ]),
] satisfies RouteConfig;
