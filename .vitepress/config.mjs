import { defineConfig } from 'vitepress';
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons';
import config from '../package.json';
import { search as enSearch } from './config/en.mjs';
import { search as zhSearch } from './config/zh.mjs';
import { locales } from './locales.mjs';
import { nav } from './nav.mjs';
import { sidebar } from './sidebar.mjs';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh', // 设置语言
  title: config.productName, // 网站标题
  description: config.description, // 网站描述
  base: `/${config.productName}/`, // 设置网站根路径
  srcDir: 'docs', // 设置 docs 文件夹为源码文件夹
  head: [['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }]], // 设置网页头部
  sitemap: {
    hostname: `${config.homepage}/${config.productName}/`,
    lastmodDateOnly: false,
  }, // 生成 sitemap.xml
  cleanUrls: true, // 生成简洁的URL，即去掉.html后缀
  metaChunk: true, // 将页面元数据提取到单独的JavaScript块中，而不是内联在初始HTML中
  lastUpdated: true, // 显示最后更新时间
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
        let { localeIndex = 'root' } = env;
        const codeCopyButtonTitle = (() => {
          localeIndex = localeIndex === 'en' ? 'Copy Code' : '复制代码';
        })();
        return fence(tokens, idx, options, env, self).replace(
          '<button title="Copy Code" class="copy"></button>',
          `<button title="${codeCopyButtonTitle}" class="copy"></button>`
        );
      };
      md.use(groupIconMdPlugin);
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    i18nRouting: true, // 启用国际化路由
    logo: '/logo.png', // 网站Logo
    siteTitle: config.productName, // 网站标题
    socialLinks: [{ icon: 'github', link: config.repository.url }], // 社交链接
    search: {
      provider: 'local',
      options: {
        locales: {
          ...zhSearch,
          ...enSearch,
        },
      },
    }, // 搜索配置
    nav,
    sidebar,
    editLink: {
      pattern: config.repository.url.replace('.git', '/edit/master/docs/:path'),
      text: 'Edit this page on GitHub',
    }, // 编辑链接
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium',
      },
    }, // 最后更新时间
    rewrites: {
      'packages/:pkg(.*)': ':pkg/index.md',
    }, // 重写路由
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2022-present ${config.productName}`,
    }, // 底部信息
  }, // 主题配置
  locales,
});
