/**
 * Purpose: ESLint flat config for the Express server (Node.js, ES modules).
 */
import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules/', 'dist/', 'coverage/'] },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      // LEARN: globals tells ESLint that names like `process` and `console` exist in Node.
      globals: { ...globals.node },
    },
    rules: {
      // Allow unused names that start with an underscore, e.g. (_req, res).
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
