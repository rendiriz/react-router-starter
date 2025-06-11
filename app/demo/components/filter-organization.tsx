import { useAsyncError, useAsyncValue } from 'react-router';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Organizations {
  id: string;
  slug: string;
  name: string;
}

export function FilterOrganization({ filter }: { filter: string[] }) {
  const organizations = useAsyncValue() as Organizations[];

  return (
    <>
      {JSON.stringify(filter, null, 2)}
      <ul>
        {organizations.map((org) => (
          <li key={org.slug}>
            <div className="flex items-center gap-3">
              <Checkbox
                key={org.id}
                name="orgs"
                value={org.slug}
                defaultChecked={filter.includes(org.slug)}
              />
              <Label htmlFor="terms">{org.name}</Label>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export function FilterOrganizationSkeleton() {
  return <div>Loading...</div>;
}

export function FilterOrganizationError() {
  const error = useAsyncError();

  if (error instanceof Error) {
    return <p>Error: {error.message}</p>;
  }

  const typedError = error as { message: string };
  return <p>Uh Oh: {typedError.message}</p>;
}
