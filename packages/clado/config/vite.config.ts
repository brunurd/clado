import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({ include: ['src'] }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, '..', 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      input: {
        main: 'src/index.ts',
      },
      external: [
        'src/**/*.spec.tsx',
        'src/**/*.spec.ts',
        'src/**/*.stories.mdx',
      ],
    },
  },
  optimizeDeps: {
    exclude: [
      'src/**/*.spec.tsx',
      'src/**/*.spec.ts',
      'src/**/*.stories.mdx',
    ],
  },
});
