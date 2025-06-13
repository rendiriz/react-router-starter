import { useAsyncError } from 'react-router';

interface Dataset {
  id: string;
  slug: string;
  name: string;
}

interface ListDatasetProps {
  items: Dataset[];
}

export function ListDataset({ items }: ListDatasetProps) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

export function ListDatasetSkeleton() {
  return <div>Loading...</div>;
}

export function ListDatasetError() {
  const error = useAsyncError();

  if (error instanceof Error) {
    return <p>Error: {error.message}</p>;
  }

  const typedError = error as { message: string };
  return <p>Uh Oh: {typedError.message}</p>;
}
