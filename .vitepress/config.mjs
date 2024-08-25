import { defineConfig } from 'vitepress';
import config from '../package.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: config.productName,
  description: config.description,
  srcDir: 'docs',
  base: `/${config.productName}/`,
  sitemap: {
    hostname: config.homepage,
    lastmodDateOnly: false,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: config.repository.url }],
    rewrites: {
      'packages/:pkg(.*)': ':pkg/index.md',
    },
  },
});
