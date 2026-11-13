/**
 * Purpose: the browser entry point. Mounts React and provides the TanStack Query cache.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';

// LEARN: create the client once, outside any component. If it lived inside a component,
// every re-render would build a new empty cache and throw away all fetched data.
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
