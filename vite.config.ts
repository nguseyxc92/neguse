import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// Relative base so the built site works from any path
// (GitHub Pages repo sub-path, Netlify, or a custom domain).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
});
