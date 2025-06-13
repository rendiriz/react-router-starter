import { redirect, useActionData } from 'react-router';
import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
    const tokens = await login(request, { username, password });
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
    <>
      <title>Login</title>
      <meta
        name="description"
        content="Login Description"
      />

      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                {actionData?.errors?.form && (
                  <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertDescription>
                      <p>{actionData.errors.form}</p>
                    </AlertDescription>
                  </Alert>
                )}
                <FormLogin />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
