import { TinyVueSingleResolver } from '@opentiny/unplugin-tiny-vue';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'electron-vite';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

const prefix = `monaco-editor/esm/vs`;

export default defineConfig({
  main: {
    build: {
      bytecode: true,
      externalizeDeps: true,
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/main/index.js'),
        },
      },
    },
  },
  preload: {
    build: {
      bytecode: true,
      externalizeDeps: true,
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/preload/index.js'),
        },
      },
    },
  },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/renderer/index.html'),
        },
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
