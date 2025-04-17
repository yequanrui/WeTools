import { defineConfig } from 'vitepress';
import config from '../package.json';
import { search as enSearch } from './config/en.mjs';
import { search as zhSearch } from './config/zh.mjs';
import { locales } from './locales.mjs';
import { nav } from './nav.mjs';
import { sidebar } from './sidebar.mjs';

export default defineConfig({
  lang: 'zh', // 设置语言
  title: config.productName, // 网站标题
  description: config.description, // 网站描述
  base: `/${config.productName}/`, // 设置网站根路径
  srcDir: 'docs', // 设置 docs 文件夹为源码文件夹
  head: [['link', { rel: 'icon', type: 'image/png', href: `/${config.productName}/logo.png` }]], // 设置网页头部
  sitemap: {
    hostname: `${config.homepage}/${config.productName}/`,
    lastmodDateOnly: false,
  }, // 生成 sitemap.xml
  cleanUrls: true, // 生成简洁的URL，即去掉.html后缀
  metaChunk: true, // 将页面元数据提取到单独的JavaScript块中，而不是内联在初始HTML中
  lastUpdated: true, // 显示最后更新时间
  themeConfig: {
    i18nRouting: true, // 启用国际化路由
    logo: `/${config.productName}/logo.png`, // 网站Logo
    siteTitle: config.productName, // 网站标题
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
    socialLinks: [{ icon: 'github', link: config.repository.url }], // 社交链接
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
