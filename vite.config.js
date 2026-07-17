import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      '/auth': 'https://kbinge-backend.onrender.com',
      '/home': 'https://kbinge-backend.onrender.com',
      '/comments': 'https://kbinge-backend.onrender.com',
      '/admin': 'https://kbinge-backend.onrender.com'
    }
  }
});
