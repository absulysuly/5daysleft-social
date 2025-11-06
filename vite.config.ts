import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite automatically exposes environment variables prefixed with "VITE_" on `import.meta.env`.
  // The API_KEY is defined here to make it available on `process.env` as per Gemini guidelines.
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  },
})