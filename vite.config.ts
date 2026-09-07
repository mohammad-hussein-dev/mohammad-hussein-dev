import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

// ============================================================================
// Vite Configuration (Production-Ready & CI/CD Optimized)
// ============================================================================

// Resolve __dirname in an ESM environment without triggering Vite native loader warnings
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // CRITICAL for GitHub Pages: Must exactly match the repository name with leading/trailing slashes.
  // Prevents 404 errors for assets (CSS/JS) which would otherwise result in a blank white screen.
  base: '/mohammad-hussein-dev/',

  plugins: [
    react(),
                            tailwindcss(),
  ],

  resolve: {
    alias: {
      // Enables clean absolute imports (e.g., import Button from '@/components/Button')
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    host: '0.0.0.0', // Allows access from the local network (e.g., testing on a mobile device)
port: 3000,
strictPort: true, // Fails explicitly if port 3000 is occupied, preventing silent port changes during dev
  },

  build: {
    outDir: 'dist',
    sourcemap: false, // Disabled in production to reduce bundle size and protect source code logic
    chunkSizeWarningLimit: 1000, // Warn if any generated chunk exceeds 1000 KB

    // NOTE: Custom rollupOptions (manualChunks) have been intentionally removed.
    // Vite's default code-splitting is highly optimized and prevents compatibility
    // issues with newer bundlers (like Rolldown) used in GitHub Actions environments.
  },

  // Configuration for locally previewing the production build (e.g., `npm run preview`)
  preview: {
    port: 3001,
    strictPort: true,
  },
});
