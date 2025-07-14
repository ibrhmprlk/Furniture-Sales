import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/web1': {
        target: 'http://localhost:5555',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
