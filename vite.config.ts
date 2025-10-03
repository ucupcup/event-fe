import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tsconfigPaths(),
    // Emit pre-compressed assets for better TTFB on capable servers
    viteCompression({ algorithm: 'brotliCompress', ext: '.br', deleteOriginFile: false }),
    viteCompression({ algorithm: 'gzip', ext: '.gz', deleteOriginFile: false }),
  ],
  build: {
    target: 'es2022',
    sourcemap: false,
    cssMinify: 'lightningcss',
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          vendor: ['axios', 'zod'],
        },
      },
    },
  },
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}))
