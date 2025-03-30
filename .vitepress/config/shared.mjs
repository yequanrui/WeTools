import { defineConfig } from 'vitepress';
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons';
import config from '../package.json';
import { search as enSearch } from './en';
import { search as zhSearch } from './zh';

export const shared = defineConfig({
  title: 'VitePress',

  rewrites: {
    'en/:rest*': ':rest*',
  },

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  markdown: {
    math: true,
    codeTransformers: [
      // We use `[!!code` in demo to prevent transformation, here we revert it back.
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code');
        },
      },
    ],
    config(md) {
      // TODO: remove when https://github.com/vuejs/vitepress/issues/4431 is fixed
      const fence = md.renderer.rules.fence;
      md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        const { localeIndex = 'root' } = env;
        const codeCopyButtonTitle = (() => {
          switch (localeIndex) {
            case 'es':
              return 'Copiar código';
            case 'fa':
              return 'کپی کد';
            case 'ko':
              return '코드 복사';
            case 'pt':
              return 'Copiar código';
            case 'ru':
              return 'Скопировать код';
            case 'zh':
              return '复制代码';
            default:
              return 'Copy code';
          }
        })();
        return fence(tokens, idx, options, env, self).replace(
          '<button title="Copy Code" class="copy"></button>',
          `<button title="${codeCopyButtonTitle}" class="copy"></button>`
        );
      };
      md.use(groupIconMdPlugin);
    },
  },

  sitemap: {
    hostname: 'https://vitepress.dev',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'));
    },
  },

  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vitepress-logo-mini.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/vitepress-logo-mini.png' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'VitePress | Vite & Vue Powered Static Site Generator' }],
    ['meta', { property: 'og:site_name', content: 'VitePress' }],
    ['meta', { property: 'og:image', content: 'https://vitepress.dev/vitepress-og.jpg' }],
    ['meta', { property: 'og:url', content: 'https://vitepress.dev/' }],
    ['script', { src: 'https://cdn.usefathom.com/script.js', 'data-site': 'AZBRSFGG', 'data-spa': 'auto', defer: '' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    i18nRouting: true, // 启用国际化路由
    logo: './logo.png', // 网站Logo
    siteTitle: config.productName, // 网站标题
    socialLinks: [
      { icon: 'github', link: config.repository.url },
      { icon: 'npm', link: 'https://www.npmjs.com/~yequanrui' },
    ], // 社交链接
    search: {
      provider: 'local',
      options: {
        locales: {
          ...zhSearch,
          ...enSearch,
        },
      },
    },
  },
});
