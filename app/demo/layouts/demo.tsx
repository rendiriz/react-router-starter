import { Outlet } from 'react-router';

export default function DemoLayout() {
  return (
    <div>
      <h1>Demo Layout</h1>
      <Outlet />
    </div>
  );
}
