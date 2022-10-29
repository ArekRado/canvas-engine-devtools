import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
  ],
  build: {
    target: 'esnext',
    // minify: 'terser',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'canvas-engine-devtools-demo',
      formats: ['es'],
      fileName: () => 'canvas-engine-devtools-demo.js',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-feather',
        'three',
        '@arekrado/canvas-engine',
        '@arekrado/vector-2d',
        '@vanilla-extract/css',
        '@vanilla-extract/recipes',
        '@vanilla-extract/sprinkles',
      ],
    },
  },
});
