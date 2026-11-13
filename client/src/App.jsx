/**
 * Purpose: the root component. Step 2 replaces its contents with the router.
 */
import { ApiStatus } from './features/health/ApiStatus.jsx';

/** @returns {import('react').ReactElement} */
export default function App() {
  return (
    <main>
      <h1>KELVINATE Power Hub</h1>
      <ApiStatus />
    </main>
  );
}
