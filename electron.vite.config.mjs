import { resolve } from 'path';
import { defineConfig, bytecodePlugin, externalizeDepsPlugin, splitVendorChunkPlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';

const prefix = `monaco-editor/esm/vs`;

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()],
  },
  renderer: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            editorWorker: [`${prefix}/editor/editor.worker`],
            jsonWorker: [`${prefix}/language/json/json.worker`],
          },
        },
      },
    },
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
