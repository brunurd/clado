import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const define: { [key: string]: string | number } = {};

for (const envVar in process.env) {
  if (envVar === 'NODE_ENV' || envVar.startsWith('PUBLIC_')) {
    define[`process.env.${envVar}`] = JSON.stringify(process.env[envVar]);
  }
}

const config = defineConfig({
  plugins: [react()],
  root: './',
  publicDir: 'public',
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(process.cwd(), 'src') },
    ],
  },
  build: {
    sourcemap: 'inline',
  },
  define,
});

export default config;
