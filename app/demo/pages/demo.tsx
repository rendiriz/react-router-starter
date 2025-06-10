import { Suspense } from 'react';
import { Await, Form, useLoaderData, useSubmit } from 'react-router';
import {
  FilterOrganization,
  FilterOrganizationError,
  FilterOrganizationSkeleton,
} from '@/demo/components/filter-organization';
import { env } from '@/env';
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

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  // const query = url.searchParams.get('q');
  const orgs = url.searchParams.getAll('orgs');

  console.log(orgs);

  const organizations = getOrganizations();

  return { organizations, filterOrganization: orgs };
}

export default function Demo() {
  const { organizations, filterOrganization } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  return (
    <div>
      <title>Demo</title>
      <meta
        name="description"
        content="Demo Description"
      />
      <h1>Demo Page</h1>

      <Suspense fallback={<FilterOrganizationSkeleton />}>
        <Await
          errorElement={<FilterOrganizationError />}
          resolve={organizations}
        >
          <Form onChange={(event) => submit(event.currentTarget)}>
            <FilterOrganization filter={filterOrganization} />
          </Form>
        </Await>
      </Suspense>
    </div>
  );
}
