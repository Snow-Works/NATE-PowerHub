/**
 * Purpose: system routes that every deployment needs (health check and server time).
 * Mounted under /api by app.js.
 */
import { Router } from 'express';

const router = Router();

// LEARN: Express 5 sends async handler errors to the error middleware automatically.
// In Express 4 you needed try/catch or a wrapper around every async handler.
router.get('/health', (req, res) => {
  res.json({ data: { status: 'ok', time: new Date().toISOString() } });
});

// The client uses this to work out how far its clock is from the server's,
// so countdowns (holds, rental timers) never depend on the device clock alone.
router.get('/time', (req, res) => {
  res.json({ data: { server_now: new Date().toISOString() } });
});

export default router;
