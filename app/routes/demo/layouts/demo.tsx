import { Form, Outlet } from 'react-router';
import { Button } from '@/components/ui/button';

export default function DemoLayout() {
  return (
    <div>
      <h1>Demo Layout</h1>
      <Form
        method="post"
        action="/logout"
      >
        <Button type="submit">Logout</Button>
      </Form>
      <Outlet />
    </div>
  );
}
