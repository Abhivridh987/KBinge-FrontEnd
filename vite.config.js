import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      '/auth': 'http://localhost:8080',
      '/home': 'http://localhost:8080',
      '/comments': 'http://localhost:8080',
      '/admin': 'http://localhost:8080'
    }
  }
});
