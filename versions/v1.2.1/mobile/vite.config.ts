import { defineConfig } from 'vite';
export default defineConfig({
  publicDir: 'public',
  base: '/',
  build: { outDir: 'www', emptyOutDir: true, target: 'es2022' },
});
