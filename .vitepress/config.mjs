import { defineConfig } from 'vitepress';
import config from '../package.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN', // 设置语言
  title: config.productName, // 网站标题
  description: config.description, // 网站描述
  srcDir: 'docs', // 设置 docs 文件夹为源码文件夹
  base: `/${config.productName}/`, // 设置网站根路径
  head: [['link', { rel: 'icon', type: 'image/png', href: 'assets/img/logo.png' }]], // 设置网页头部
  sitemap: {
    hostname: `${config.homepage}/${config.productName}/`,
    lastmodDateOnly: false,
  }, // 生成 sitemap.xml
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    i18nRouting: true, // 启用国际化路由
    logo: 'assets/img/logo.png', // 网站Logo
    siteTitle: config.productName, // 网站标题
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                },
              },
            },
          },
        },
      },
    }, // 搜索配置
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Team', link: '/team' },
      {
        text: 'Guides',
        items: [
          { text: 'Markdown Examples', link: '/guides/markdown-examples' },
          { text: 'Runtime API Examples', link: '/guides/api-examples' },
        ],
      },
    ],
    sidebar: {
      '/guides/': [
        {
          text: 'Guides',
          collapsed: false,
          items: [
            { text: 'Index', link: '/guides/' },
            { text: 'Markdown Examples', link: '/guides/markdown-examples' },
            { text: 'Runtime API Examples', link: '/guides/api-examples' },
          ],
        },
      ],
      '/packages/': [
        {
          text: 'Packages',
          collapsed: false,
          items: [
            { text: 'Index', link: '/packages/' },
            { text: 'WeLink-Themes-Blue 1.0.0', link: '/packages/WeLink-Themes-Blue-1.0.0' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: config.repository.url },
      { icon: 'npm', link: 'https://www.npmjs.com/~yequanrui' },
    ], // 社交链接
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
      copyright: 'Copyright © 2021-present Quanrui Ye',
    }, // 底部信息
  }, // 主题配置
  lastUpdated: true, // 显示最后更新时间
});
