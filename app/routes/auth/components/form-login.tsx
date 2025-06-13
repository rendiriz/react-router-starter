import { Form, useActionData, useNavigation } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ActionData = {
  errors?: {
    username?: string[];
    password?: string[];
  };
  message?: string | null;
};

export default function FormLogin() {
  const actionData = useActionData() as ActionData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post">
      <div className="flex flex-col gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            required
          />
          {actionData?.errors?.username && (
            <p
              data-slot="form-message"
              id="username"
              className="text-sm text-destructive"
            >
              {actionData.errors.username[0]}
            </p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            required
          />
          {actionData?.errors?.password && (
            <p
              data-slot="form-message"
              id="password"
              className="text-sm text-destructive"
            >
              {actionData.errors.password[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </div>
    </Form>
  );
}
