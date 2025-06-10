import { relative, type RouteConfig } from '@react-router/dev/routes';

const { layout, index } = relative('app/public');

export default [
  layout('layouts/public.tsx', [index('pages/home.tsx')]),
] satisfies RouteConfig;
