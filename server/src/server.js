/**
 * Purpose: start the HTTP server on a port. Local development only.
 * On Vercel this file is never used; api/index.js exports the app instead (Step 6).
 */
import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

// Express 5 passes startup errors (for example, port already in use) to this callback.
app.listen(env.PORT, (error) => {
  if (error) {
    console.error(`Could not start the server on port ${env.PORT}: ${error.message}`);
    process.exit(1);
  }
  console.log(`API listening on http://localhost:${env.PORT} (${env.NODE_ENV})`);
});
