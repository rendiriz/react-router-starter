import { Suspense, useEffect, useRef, useState } from 'react';
import { Await, Form, useLoaderData, useSubmit } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getOrganizations } from '@/domains/organization/organization.repository';
import { env } from '@/env';
import { requireAuth } from '@/lib/auth/default/session.server';
import {
  FilterOrganization,
  FilterOrganizationError,
  FilterOrganizationSkeleton,
} from '../components/filter-organization';
import {
  ListDataset,
  ListDatasetError,
  ListDatasetSkeleton,
} from '../components/list-dataset';
import type { Route } from './+types/demo';

async function getAllOrganization(request: Request) {
  const params = {
    sort: 'name:asc',
    where: JSON.stringify({ is_active: true, is_deleted: false }),
    all: true,
  };
  const organization = await getOrganizations(request, params);
  return organization.data;
}

async function getDatasets(parameters: any): Promise<any[]> {
  let pWhere = {};

  if (parameters.organization.length > 0) {
    pWhere = { ...pWhere, organisasi_slug: parameters.organization };
  }

  const params = {
    search: parameters.search ?? '',
    page: '1',
    per_page: '10',
    where: JSON.stringify(pWhere),
  };

  const merge = new URLSearchParams(params);
  const response = await fetch(`${env.VITE_PUBLIC_API_URL}/datasets?${merge}`, {
    method: 'GET',
  });
  const data = await response.json();
  console.log('✅ Datasets fetched');
  return data.data;
}

export async function loader({ request }: Route.LoaderArgs) {
  await requireAuth(request);

  const url = new URL(request.url);
  const query = url.searchParams.get('q');
  const organization = url.searchParams.getAll('organization');

  const datasets = getDatasets({ search: query, organization });
  const organizations = getAllOrganization(request);

  return {
    datasets,
    organizations,
    filterSearch: query,
    filterOrganization: organization,
  };
}

export default function Demo() {
  const { datasets, organizations, filterSearch, filterOrganization } =
    useLoaderData<typeof loader>();
  const submit = useSubmit();

  const [searchValue, setSearchValue] = useState(filterSearch ?? '');
  const isTypingRef = useRef(false);

  const updateFilters = (updates: { search?: string; organizations?: string[] }) => {
    const params = new URLSearchParams(window.location.search);

    if (updates.search !== undefined) {
      if (updates.search) {
        params.set('q', updates.search);
      } else {
        params.delete('q');
      }
    }

    // Update organization parameters
    if (updates.organizations !== undefined) {
      params.delete('organization');
      updates.organizations.forEach((org) => {
        params.append('organization', org);
      });
    }

    submit(params, { method: 'get' });
  };

  useEffect(() => {
    if (!isTypingRef.current) {
      setSearchValue(filterSearch ?? '');
    }
  }, [filterSearch]);

  const handleSearch = () => {
    isTypingRef.current = false;
    updateFilters({ search: searchValue });
  };

  const handleClearSearch = () => {
    isTypingRef.current = false;
    setSearchValue('');
    updateFilters({ search: '' });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    isTypingRef.current = true;
    setSearchValue(event.target.value);

    setTimeout(() => {
      isTypingRef.current = false;
    }, 5000);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div>
      <title>Demo</title>
      <meta
        name="description"
        content="Demo Description"
      />
      <h1>Demo Page</h1>

      <Form>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Suspense fallback={<FilterOrganizationSkeleton />}>
              <Await
                errorElement={<FilterOrganizationError />}
                resolve={organizations}
              >
                {(resolvedOrganizations) => (
                  <FilterOrganization
                    items={resolvedOrganizations}
                    selected={filterOrganization}
                    onSelectionChange={(slug, isChecked) => {
                      const nextSelectedOrgs = isChecked
                        ? [...filterOrganization, slug]
                        : filterOrganization.filter((s) => s !== slug);

                      updateFilters({ organizations: nextSelectedOrgs });
                    }}
                  />
                )}
              </Await>
            </Suspense>
          </div>
          <div className="col-span-2 flex flex-col">
            <div className="mb-4 flex gap-2">
              <Input
                type="text"
                placeholder="Search"
                name="q"
                value={searchValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleSearch}
                disabled={searchValue === filterSearch}
              >
                Search
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClearSearch}
                disabled={!searchValue && !filterSearch}
              >
                Clear
              </Button>
            </div>

            <Suspense fallback={<ListDatasetSkeleton />}>
              <Await
                errorElement={<ListDatasetError />}
                resolve={datasets}
              >
                {(resolvedDatasets) => <ListDataset items={resolvedDatasets} />}
              </Await>
            </Suspense>
          </div>
        </div>
      </Form>
    </div>
  );
}
