import { useAsyncError } from 'react-router';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Organizations {
  id: string;
  slug: string;
  name: string;
}

interface FilterOrganizationProps {
  items: Organizations[];
  selected: string[];
  onSelectionChange: (slug: string, isChecked: boolean) => void;
}

export function FilterOrganization({
  items,
  selected,
  onSelectionChange,
}: FilterOrganizationProps) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">Organizations</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.slug}>
            <div className="flex items-center gap-3">
              <Checkbox
                id={`org-${item.slug}`}
                name="organization"
                value={item.slug}
                checked={selected.includes(item.slug)}
                onCheckedChange={(isChecked) => {
                  onSelectionChange(item.slug, !!isChecked);
                }}
              />
              <Label htmlFor={`org-${item.slug}`}>{item.name}</Label>
            </div>
          </li>
        ))}
      </ul>
    </div>
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
