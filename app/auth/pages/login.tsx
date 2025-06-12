import { useActionData } from 'react-router';
import FormLogin from '@/auth/components/form-login';
import { LoginFormSchema } from '@/domains/auth/auth.schema';
import type { Route } from './+types/login';

// import { getSession } from '@/lib/auth/default/session.server';

type ActionData = {
  errors?: {
    username?: string[];
    password?: string[];
  };
  message?: string | null;
};

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
