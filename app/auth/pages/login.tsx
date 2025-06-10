import FormLogin from '@/auth/components/form-login';
import type { Route } from './+types/login';

export async function action({ request }: Route.ActionArgs) {
  await new Promise((res) => setTimeout(res, 5000));
  const formData = await request.formData();

  console.log(formData);

  return formData;
}

export default function Login() {
  return (
    <div>
      <title>Login</title>
      <meta
        name="description"
        content="Login Description"
      />
      <h1>Login Page</h1>
      <FormLogin />
    </div>
  );
}
