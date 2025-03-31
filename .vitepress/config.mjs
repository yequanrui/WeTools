import { defineConfig } from 'vitepress';
import config from '../package.json';
import { locales } from './locales.js';
import { nav } from './nav.js';
import { sidebar } from './sidebar.js';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh', // 设置语言
  title: config.productName, // 网站标题
  description: config.description, // 网站描述
  base: `/${config.productName}/`, // 设置网站根路径
  srcDir: 'docs', // 设置 docs 文件夹为源码文件夹
  head: [['link', { rel: 'icon', type: 'image/png', href: './logo.png' }]], // 设置网页头部
  sitemap: {
    hostname: `${config.homepage}/${config.productName}/`,
    lastmodDateOnly: false,
  }, // 生成 sitemap.xml
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    i18nRouting: true, // 启用国际化路由
    logo: './logo.png', // 网站Logo
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
          en: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search for documents',
              },
              modal: {
                noResultsText: 'No results',
                resetButtonTitle: 'Clear condition',
                footer: {
                  selectText: 'Select',
                  navigateText: 'Switch',
                },
              },
            },
          },
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
      copyright: 'Copyright © 2021-present Quanrui Ye',
    }, // 底部信息
  }, // 主题配置
  locales,
  lastUpdated: true, // 显示最后更新时间
});
