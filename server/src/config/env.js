/**
 * Purpose: read, validate and freeze the server's environment variables once, at startup.
 * Every other file imports `env` from here instead of touching process.env directly.
 */
import { z } from 'zod';

/**
 * True when the value is a bare origin such as http://localhost:5173.
 * Browsers send Origin without a path or trailing slash, so we must store it the same way.
 * @param {string} value
 * @returns {boolean}
 */
function isOrigin(value) {
  try {
    return new URL(value).origin === value;
  } catch {
    return false;
  }
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  // LEARN: environment variables are always strings. z.coerce.number() turns "4000" into 4000.
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  CLIENT_ORIGIN: z.string().default('').refine(isOrigin, {
    message: 'must be an origin such as http://localhost:5173 (no path, no trailing slash)',
  }),
});

/**
 * Validate a source of environment variables.
 * Exits the process with a readable message when something is wrong ("fail fast").
 * @param {Record<string, string | undefined>} source Usually process.env.
 * @returns {Readonly<z.infer<typeof envSchema>>}
 */
export function loadEnv(source) {
  const result = envSchema.safeParse(source);

  if (!result.success) {
    // Print names and problems only, never the values: values can be secrets.
    const lines = result.error.issues.map(
      (issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`,
    );
    console.error(
      [
        'Invalid environment configuration:',
        ...lines,
        'Fix server/.env (compare with server/.env.example) and restart.',
      ].join('\n'),
    );
    process.exit(1);
  }

  return Object.freeze(result.data);
}

export const env = loadEnv(process.env);
