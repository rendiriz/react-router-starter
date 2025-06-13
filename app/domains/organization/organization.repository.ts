import { URLSearchParams } from 'url';
import { createApiServer } from '@/lib/api/default/api.server';
import type { PaginatedOrganization } from './organization.type';

export const getOrganizations = async (
  request: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter: Record<string, any> = {},
): Promise<PaginatedOrganization> => {
  const api = createApiServer(request);

  const query = Object.keys(filter).length > 0 ? `?${new URLSearchParams(filter)}` : '';

  return await api.get<PaginatedOrganization>(`/organisasi${query}`);
};
