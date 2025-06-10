import { useFetcher } from 'react-router';

export default function FormLogin() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      method="get"
      action="/search"
    >
      <input
        type="text"
        name="title"
      />
      {fetcher.state !== 'idle' && <p>Saving...</p>}
      {fetcher.data && <p>{fetcher.data.message}</p>}
    </fetcher.Form>
  );
}
