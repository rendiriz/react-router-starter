import { getSession } from '@/lib/auth/default/session.server';
import { ApiBase } from './api.base';

export class ApiServer extends ApiBase {
  private request: Request;

  constructor(request: Request) {
    super();
    this.request = request;
  }

  protected async getAuthHeaders(): Promise<HeadersInit | null> {
    try {
      const cookieHeader = this.request.headers.get('Cookie');
      const session = await getSession(cookieHeader);
      const accessToken = session.get('accessToken') as string | undefined;

      if (!accessToken) {
        return null;
      }

      return {
        Authorization: `Bearer ${accessToken}`,
      };
    } catch (error) {
      console.error('Failed to get auth session:', error);
      return null;
    }
  }
}

export function createApiServer(request: Request): ApiServer {
  return new ApiServer(request);
}
