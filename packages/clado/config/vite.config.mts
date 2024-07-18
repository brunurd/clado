import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tsconfig from 'vite-plugin-tsconfig';

export default defineConfig({
  root: './',
  plugins: [
    tsconfig({
      filename: 'config/tsconfig.build.json',
    }),
    react(),
    dts({ include: ['src'] }),
  ],
  build: {
    sourcemap: 'inline',
    lib: {
      entry: path.resolve(__dirname, '..', 'src/index.ts'),
      formats: ['es'],
    },
    manifest: true,
  },
});
