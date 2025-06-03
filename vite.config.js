import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: './', 

  server: {
    port: 8080,       
    open: true,       
    hot: true,        
  },

  build: {
    outDir: 'dist', 
    emptyOutDir: true, 
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'), 
      },
    },
  },

  css: {
    preprocessorOptions: {
      scss: {

      },
    },
  },
});