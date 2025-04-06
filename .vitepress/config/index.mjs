import { defineConfig } from 'vitepress';
import { en } from './en.mjs';
import { shared } from './shared.mjs';
import { zh } from './zh.mjs';

export default defineConfig({
  ...shared,
  locales: {
    root: zh,
    en,
  },
});
