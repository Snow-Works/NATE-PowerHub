/**
 * Purpose: one small wrapper around fetch for calling our API.
 * It unwraps the { data } success shape and turns every failure into an ApiError,
 * so screens only ever deal with one kind of error.
 */

// Strip trailing slashes so `${API_URL}/api/health` never becomes "//api/health".
const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '');

/** Error type thrown by apiGet. `code` mirrors the server's error codes. */
export class ApiError extends Error {
  /**
   * @param {string} message Friendly text that is safe to show to the user.
   * @param {{ status?: number, code?: string }} [details]
   */
  constructor(message, { status, code } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

/**
 * GET a JSON endpoint and return the `data` part of the response.
 * @param {string} path Path starting with "/", for example "/api/health".
 * @param {{ signal?: AbortSignal }} [options] Signal lets TanStack Query cancel the request.
 * @returns {Promise<any>}
 * @throws {ApiError}
 */
export async function apiGet(path, { signal } = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      signal,
      headers: { Accept: 'application/json' },
    });
  } catch (error) {
    // A cancelled request is not a failure; let the caller handle it.
    if (error.name === 'AbortError') throw error;
    // LEARN: fetch only rejects when no response arrived at all: server down, offline,
    // or the browser blocked the response (CORS). HTTP errors like 404 arrive as normal responses.
    throw new ApiError('Cannot reach the server. Check your connection and try again.', {
      code: 'NETWORK_ERROR',
    });
  }

  let body = null;
  try {
    body = await response.json();
  } catch {
    // Not JSON (for example an HTML error page). Handled below.
  }

  if (!response.ok) {
    throw new ApiError(body?.error?.message ?? 'Something went wrong. Please try again.', {
      status: response.status,
      code: body?.error?.code ?? 'INTERNAL',
    });
  }

  if (!body || !('data' in body)) {
    throw new ApiError('The server sent an unexpected response.', {
      status: response.status,
      code: 'INVALID_RESPONSE',
    });
  }

  return body.data;
}
