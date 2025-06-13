import { createCookieSessionStorage, redirect } from 'react-router';
import { env } from '@/env';

type SessionData = {
  userId: string;
  role: string;
  accessToken: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: '__rrs_session',
    httpOnly: true,
    maxAge: env.SESSION_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secrets: [env.SESSION_SECRET],
    secure: env.NODE_ENV === 'production',
  },
});

export async function requireAuth(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));

  if (!session.has('accessToken')) {
    throw redirect('/login', {
      headers: {
        'Set-Cookie': await destroySession(session),
      },
    });
  }

  return session;
}

export { getSession, commitSession, destroySession };
