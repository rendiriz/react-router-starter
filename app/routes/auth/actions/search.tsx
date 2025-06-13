import type { Route } from './+types/search';

export async function loader() {
  await new Promise((res) => setTimeout(res, 5000));

  return { message: 'I handle GET' };
}

export async function action({ request }: Route.ActionArgs) {
  await new Promise((res) => setTimeout(res, 5000));

  console.log(request.method);

  return Response.json({
    message: 'I handle everything else',
  });
}
