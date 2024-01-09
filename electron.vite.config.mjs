import { resolve } from 'path';
import { defineConfig, bytecodePlugin, externalizeDepsPlugin, splitVendorChunkPlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
      extensions: ['.js', '.jsx', '.vue'],
    },
    plugins: [splitVendorChunkPlugin(), vue()],
    define: {
      'process.env': { ...process.env },
    },
  },
});
