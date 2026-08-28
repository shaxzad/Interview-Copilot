import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: false,
    fs: {
      allow: [path.resolve(__dirname, '../..')],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      '@shared': '/../../packages/shared-types/src',
      '@schemas': '/../../packages/ai-schemas/src',
    },
  },
});
