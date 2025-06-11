import { useAsyncError, useAsyncValue } from 'react-router';

interface Dataset {
  id: string;
  slug: string;
  name: string;
}

export function ListDataset() {
  const dataset = useAsyncValue() as Dataset[];

  return (
    <ul>
      {dataset.map((item) => (
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
