import { redirect, useActionData } from 'react-router';
import { login } from '@/domains/auth/auth.repository';
import { LoginFormSchema } from '@/domains/auth/auth.schema';
import { createAuthSession } from '@/lib/auth/default/auth.server';
import { commitSession, getSession } from '@/lib/auth/default/session.server';
import { FetchError } from '@/lib/error/error.type';
import FormLogin from '../components/form-login';
import type { Route } from './+types/login';

type ActionData = {
  errors?: {
    username?: string[];
    password?: string[];
    form?: string;
  };
};

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('accessToken')) {
    return redirect('/demo');
  }
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const validatedFields = LoginFormSchema.safeParse({
    username,
    password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const tokens = await login({ username, password });
    const authSession = await createAuthSession(request, tokens);

    return redirect('/demo', {
      headers: {
        'Set-Cookie': await commitSession(authSession),
      },
    });
  } catch (error) {
    if (error instanceof FetchError) {
      if (error.status === 401 || error.status === 403) {
        return {
          errors: { form: 'Invalid username or password.' },
        };
      }

      return {
        errors: { form: error.message },
      };
    }

    console.error('An unexpected error occurred:', error);
    return {
      errors: {
        form: 'An unexpected error occurred. Please try again later.',
      },
    };
  }
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
        {actionData?.errors?.form && (
          <p className="mt-2 text-sm text-red-600">{actionData.errors.form}</p>
        )}
        <FormLogin />
      </div>
    </div>
  );
}
