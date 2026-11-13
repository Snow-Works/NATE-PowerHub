import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    port: 5173,
    // LEARN: our API only trusts http://localhost:5173 (CORS). If the port is taken,
    // fail with a clear error instead of silently moving to another port and breaking CORS.
    strictPort: true,
  },
})



