import { env } from '@/env';
import { FetchError } from '@/lib/error/error.type';

export interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

export abstract class ApiBase {
  protected abstract getAuthHeaders(): Promise<HeadersInit | null>;

  async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { skipAuth = false, ...fetchOptions } = options;

    let response: Response;

    try {
      const authHeaders = skipAuth ? null : await this.getAuthHeaders();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...fetchOptions.headers,
      };

      response = await fetch(`${env.VITE_PUBLIC_API_URL}${endpoint}`, {
        ...fetchOptions,
        headers,
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
      return await response.json();
    } catch (error) {
      throw new FetchError({
        reason: 'ParseError',
        message: "Failed to parse the server's response.",
        cause: error,
      });
    }
  }

  async get<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    return this.fetch<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data: unknown, options: FetchOptions = {}): Promise<T> {
    return this.fetch<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown, options: FetchOptions = {}): Promise<T> {
    return this.fetch<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(
    endpoint: string,
    data: unknown,
    options: FetchOptions = {},
  ): Promise<T> {
    return this.fetch<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    return this.fetch<T>(endpoint, { ...options, method: 'DELETE' });
  }
}
