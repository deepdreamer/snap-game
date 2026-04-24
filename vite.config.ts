import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // simulates browser dom
    setupFiles: './src/test/setup.js',
    globals: true,
  }
})
