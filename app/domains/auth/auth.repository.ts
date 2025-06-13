import { createApiServer } from '@/lib/api/default/api.server';
import type { LoginPayload, LoginResponse } from './auth.type';

export const login = async (
  request: Request,
  credentials: LoginPayload,
): Promise<LoginResponse> => {
  const api = createApiServer(request);
  return await api.post<LoginResponse>('/auth/signin', credentials, { skipAuth: true });
};
