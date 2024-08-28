import { defineConfig } from 'vitepress';
import config from '../package.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN', // 设置语言
  title: config.productName, // 网站标题
  description: config.description, // 网站描述
  srcDir: 'docs', // 设置 docs 文件夹为源码文件夹
  base: `/${config.productName}/`, // 设置网站根路径
  sitemap: {
    hostname: `${config.homepage}/${config.productName}/`,
    lastmodDateOnly: false,
  }, // 生成 sitemap.xml
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '../src/renderer/src/assets/img/logo.png', // 网站Logo
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
    editLink: {
      pattern: config.repository.url.replace('.git', '/edit/master/docs/:path'),
      text: 'Edit this page on GitHub',
    },
    rewrites: {
      'packages/:pkg(.*)': ':pkg/index.md',
    },
  }, // 主题配置
  lastUpdated: true, // 显示最后更新时间
});
