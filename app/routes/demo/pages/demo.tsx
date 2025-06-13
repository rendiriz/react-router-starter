import { Suspense } from 'react';
import { Await, Form, useLoaderData, useSubmit } from 'react-router';
import { Input } from '@/components/ui/input';
import { env } from '@/env';
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

export interface Organizations {
  name: string;
}

async function getOrganizations(): Promise<Organizations[]> {
  const response = await fetch(`${env.VITE_PUBLIC_API_URL}/organisasi`, {
    method: 'GET',
  });
  const data = await response.json();
  return data.data;
}

async function getDatasets(parameters: any): Promise<Organizations[]> {
  let pWhere = {};

  if (parameters.organization.length > 0) {
    pWhere = { ...pWhere, organisasi_slug: parameters.organization };
  }

  const params = {
    search: parameters.search,
    page: '1',
    per_page: '10',
    where: JSON.stringify(pWhere),
  };

  const merge = new URLSearchParams(params);
  const response = await fetch(`${env.VITE_PUBLIC_API_URL}/datasets?${merge}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data.data;
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q');
  const organization = url.searchParams.getAll('orgs');

  const datasets = getDatasets({ search: query, organization });
  const organizations = getOrganizations();

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

  return (
    <div>
      <title>Demo</title>
      <meta
        name="description"
        content="Demo Description"
      />
      <h1>Demo Page</h1>

      {/* <Form onChange={(event) => submit(event.currentTarget)}> */}
      {/* <Form> */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Suspense fallback={<FilterOrganizationSkeleton />}>
            <Await
              errorElement={<FilterOrganizationError />}
              resolve={organizations}
            >
              <FilterOrganization filter={filterOrganization} />
            </Await>
          </Suspense>
        </div>
        <div className="col-span-2 flex flex-col">
          <Input
            type="text"
            placeholder="search"
            name="q"
            defaultValue={filterSearch ?? undefined}
            onChange={(event) => {
              submit({
                q: event.target.value,
              });
            }}
          />

          <Suspense fallback={<ListDatasetSkeleton />}>
            <Await
              errorElement={<ListDatasetError />}
              resolve={datasets}
            >
              <ListDataset />
            </Await>
          </Suspense>
        </div>
      </div>
      {/* </Form> */}
    </div>
  );
}
