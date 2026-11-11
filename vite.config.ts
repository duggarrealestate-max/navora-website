import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  resolve: {
    alias: {
    '@': '/src',
    '@design': '/src/design',
    '@platform': '/src/platform',
    '@vertical': '/src/verticals',
    '@demo': '/src/demo',
    '@integrations': '/src/integrations',
    '@app': '/src/app',
    '@shared': '/src/shared',
    '@features': '/src/features',
    '@public': '/src/public',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'gsap-vendor': ['gsap'],
          'framer-vendor': ['framer-motion'],
        },
      },
    },
  },
});
