import { createCookieSessionStorage, redirect } from 'react-router';
import { env } from '@/env';

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: '__session',
    httpOnly: true,
    maxAge: env.SESSION_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secrets: [env.SESSION_SECRET!],
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function requireAuth(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));

  if (!session.has('userId')) {
    throw redirect('/login', {
      headers: {
        'Set-Cookie': await destroySession(session),
      },
    });
  }

  return session;
}

export { getSession, commitSession, destroySession };
