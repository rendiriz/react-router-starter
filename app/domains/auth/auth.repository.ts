import { env } from '@/env';
import { FetchError } from '@/lib/error/error.type';
import type { LoginPayload, LoginResponse } from './auth.type';

export const login = async (credentials: LoginPayload): Promise<LoginResponse> => {
  let response: Response;

  try {
    response = await fetch(`${env.VITE_PUBLIC_API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  } catch (error) {
    throw new FetchError({
      reason: 'NetworkError',
      message: 'A network error occurred. Please check your connection.',
      cause: error,
    });
  }

  if (!response.ok) {
    const errorDetails = await response.json().catch(() => null);

    throw new FetchError({
      reason: 'HttpStatusError',
      status: response.status,
      message: errorDetails?.message ?? `Request failed with status ${response.status}`,
      cause: errorDetails,
    });
  }

  try {
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new FetchError({
      reason: 'ParseError',
      message: "Failed to parse the server's response.",
      cause: error,
    });
  }
};
