/**
 * Purpose: build and configure the Express application WITHOUT starting a server.
 * server.js listens on a port locally; Vercel and tests import createApp() directly.
 */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env.js';
import healthRoutes from './routes/health.routes.js';


/**
 * Create the configured Express app.
 * @returns {import('express').Express}
 */

export function createApp() {
  const app = express();

  // Helmet sets safe  default security headers
  app.use(helmet());

  // LEARN: CORS is a browser rule, not a firewall. We tell browsers which website may
  // our response. curl and server-to-server calls ignore it, so it never replaces
  // the function form sends NO allow-origin header at all to unknown origins.
  app.use(
    cors({
      origin: (origin, callback) => callback(null, origin === env.CLIENT_ORIGIN),
    }),
  );

  // cap the body sizes so nobody can post a huge JSON payload at us.
  app.use(express.json({ limit: '100kb' }));

  app.use('/api', healthRoutes);

  // LEARN: Express 5 wildcard syntax. "/{*splat}" matches every path, including "/".
  app.all('/{*splat}', (req, res) => {
    res.status(404).json({
      error: { code: 'NOT_FOUND', message: `Route not found: ${req.method} ${req.path}` },
    });
  });

  //TODO(Step 6): central error handler returning the standard { error: { code, message } } shape.

  return app;

}
