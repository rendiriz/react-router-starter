import { relative, type RouteConfig } from '@react-router/dev/routes';

const { layout, route } = relative('app/demo');

export default [
  layout('layouts/demo.tsx', [
    route('demo', 'pages/demo.tsx'),
    // route('search', 'actions/search.tsx'),
  ]),
] satisfies RouteConfig;
