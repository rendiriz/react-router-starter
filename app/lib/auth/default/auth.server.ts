import type { LoginResponse } from '@/domains/auth/auth.type';
import { getSession } from './session.server';

export async function createAuthSession(request: Request, data: LoginResponse) {
  const session = await getSession(request.headers.get('Cookie'));

  session.set('userId', data.id);
  session.set('role', data.role);
  session.set('accessToken', data.jwt);

  return session;
}
