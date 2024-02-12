import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(), // hash模式
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/index.vue'),
    },
    {
      path: '/welink-themes',
      name: 'welinkThemes',
      component: () => import('./views/welink-themes.vue'),
    },
    {
      path: '/app-setting',
      name: 'appSetting',
      component: () => import('./views/app-setting.vue'),
    },
    {
      path: '/app-docs',
      name: 'appDocs',
      component: () => import('./views/app-docs.vue'),
    },
  ],
});

export default router;
