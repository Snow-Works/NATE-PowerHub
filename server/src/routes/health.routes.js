/**
 * Purpose: system routes that every deployment needs (health check now, server time in a moment).
 * Mounted under /api by app.js.
 */
import { Router } from 'express';

const router = Router();

// LEARN: Express 5 sends async handler errors to the error middleware automatically.
// In Express 4 you needed try/catch or a wrapper around every async handler.
router.get('/health', (req, res) => {
  res.json({ data: { status: 'ok', time: new Date().toISOString() } });
});

// TODO(your turn): add GET /time returning { data: { server_now: '<ISO UTC>' } } here.

export default router;
