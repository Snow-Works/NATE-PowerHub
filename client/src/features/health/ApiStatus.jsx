/**
 * Purpose: proves the browser can talk to the API.
 * Shows a loading state, an error state with retry, and the success text "API OK".
 */
import { useQuery } from '@tanstack/react-query';
import { apiGet } from '../../lib/api.js';

/**
 * Calls GET /api/health and renders the result.
 * @returns {import('react').ReactElement}
 */
export function ApiStatus() {
  // LEARN: in TanStack Query v5, `isPending` means "no data yet". The queryKey is the
  // cache label for this data. Two components using ['health'] would share one request.
  const { isPending, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['health'],
    queryFn: ({ signal }) => apiGet('/api/health', { signal }),
    // Default is 3 retries with backoff, which would delay the error screen by several seconds.
    retry: false,
  });

  if (isPending) {
    return <p role="status">Checking the API…</p>;
  }

  if (isError) {
    return (
      <div role="alert">
        <p>Could not reach the API.</p>
        <p>{error.message}</p>
        <button type="button" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Trying…' : 'Try again'}
        </button>
      </div>
    );
  }

  return <p role="status">API OK</p>;
}
