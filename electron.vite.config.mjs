import { TinyVueSingleResolver } from '@opentiny/unplugin-tiny-vue';
import vue from '@vitejs/plugin-vue';
import { bytecodePlugin, defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

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
    plugins: [
      vue(),
      Components({
        resolvers: [TinyVueSingleResolver],
      }),
      AutoImport({
        resolvers: [TinyVueSingleResolver],
      }),
    ],
    define: {
      'process.env': { TINY_MODE: 'pc' },
    },
  },
});
