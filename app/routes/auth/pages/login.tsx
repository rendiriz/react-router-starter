import { redirect, useActionData } from 'react-router';
import { LoginFormSchema } from '@/domains/auth/auth.schema';
import { getSession } from '@/lib/auth/default/session.server';
import FormLogin from '../components/form-login';
import type { Route } from './+types/login';

type ActionData = {
  errors?: {
    username?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('userId')) {
    // Redirect to the home page if they are already signed in.
    return redirect('/demo');
  }
}

export async function action({ request }: Route.ActionArgs) {
  // const session = await getSession(
  //   request.headers.get("Cookie")
  // );

  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('password');

  const validatedFields = LoginFormSchema.safeParse({
    username,
    password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: null,
    };
  }

  return {
    message: 'Validation failed. Please check the fields.',
  };
}

export default function Login() {
  const actionData = useActionData() as ActionData;

  return (
    <div>
      <title>Login</title>
      <meta
        name="description"
        content="Login Description"
      />
      <h1>Login Page</h1>

      <div>
        {actionData?.message && (
          <p className="mt-2 text-sm text-red-600">{actionData.message}</p>
        )}
        <FormLogin />
      </div>
    </div>
  );
}
