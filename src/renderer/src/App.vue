<script setup>
import { ref } from 'vue';
import Button from '@opentiny/vue-button';
import Container from '@opentiny/vue-container';
import TreeMenu from '@opentiny/vue-tree-menu';
import { about, versions } from './components';

const winHandle = (opera) => window.api[opera]();
const currentLocale = ref('System');
const currentTheme = ref('System');
// 切换语言（zh-CN/en-US）
async function toggleLocale() {
  const next = currentLocale.value === 'zh-CN' ? 'en-US' : 'zh-CN';
  const isZhCn = await window.api.toggleLocale(next);
  currentLocale.value = isZhCn;
}
async function systemLocale() {
  await window.api.systemLocale();
  currentLocale.value = 'System';
}
// 切换主题（Dark/Light）
async function toggleTheme() {
  const isDarkMode = await window.api.toggleTheme();
  currentTheme.value = isDarkMode ? 'Dark' : 'Light';
}
async function systemTheme() {
  await window.api.systemTheme();
  currentTheme.value = 'System';
}
const treeMenu = ref(null);
const treeData = ref([
  { id: 'welink-themes', label: 'WeLink主题' },
  { id: 'app-setting', label: '应用设置' },
  { id: 'app-docs', label: '应用文档' },
]);
// treeMenu.value.setCurrentKey('welink-themes');
</script>

<template>
  <Container id="win" :pattern="'legend'" :header-height="48" :aside-width="270" :footer-height="40">
    <template #header>
      <div class="win-header drag no-select">
        <div class="win-left">
          <span class="win-logo">
            <img width="20px" height="20px" src="./assets/img/logo.png" />
          </span>
          <span class="win-title">WeLink主题设置工具</span>
        </div>
        <div class="win-right">
          <div id="lang-btn" class="win-btn no-drag" title="切换语言">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M16.36 14.02h3.37q.29-1.32.29-2.02t-.29-2.02h-3.37q.14.99.14 2.02t-.14 2.02zm-1.78 5.53q1.17-.38 2.44-1.43t1.92-2.14h-2.96q-.46 1.88-1.4 3.57zm-.24-5.53q.14-.99.14-2.02t-.14-2.02H9.66q-.15.99-.15 2.02t.15 2.02h4.68zM12 19.97q1.31-1.92 1.92-3.98h-3.84q.6 2.06 1.92 3.98zM8.02 8.02Q8.58 6 9.42 4.45q-1.17.38-2.46 1.43t-1.9 2.14h2.96zm-2.96 7.96q.61 1.08 1.9 2.14t2.46 1.43q-.94-1.7-1.4-3.57H5.06zm-.8-1.96h3.38Q7.5 13.03 7.5 12t.14-2.02H4.27Q3.99 11.3 3.99 12t.28 2.02zM12 4.03q-1.31 1.92-1.92 3.99h3.84q-.6-2.07-1.92-3.99zm6.94 3.99q-.66-1.08-1.92-2.14t-2.44-1.43q.84 1.55 1.4 3.57h2.96zm-6.94-6q4.13 0 7.05 2.93T21.98 12t-2.93 7.06T12 21.99t-7.05-2.93T2 12t2.94-7.05T12 2.02z"
              />
            </svg>
          </div>
          <div id="theme-btn" class="win-btn no-drag" title="切换主题">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M17.48 12q.61 0 1.06-.42t.44-1.08-.44-1.08T17.48 9t-1.05.42-.45 1.08.45 1.08 1.05.42zm-3-3.98q.61 0 1.06-.45t.44-1.05-.44-1.06-1.06-.44-1.05.44-.45 1.06.45 1.05 1.05.45zm-4.96 0q.6 0 1.05-.45t.45-1.05-.45-1.06-1.05-.44-1.06.44-.44 1.06.44 1.05 1.06.45zm-3 3.98q.6 0 1.05-.42t.45-1.08-.45-1.08T6.52 9t-1.06.42-.44 1.08.44 1.08 1.06.42zM12 3q3.7 0 6.35 2.34T21 11.02q0 2.06-1.48 3.51t-3.54 1.45h-1.73q-.66 0-1.08.45t-.42 1.05q0 .52.38.99t.37 1.03q0 .66-.42 1.08T12 21q-3.75 0-6.38-2.63T3 12t2.63-6.38T12 3z"
              />
            </svg>
          </div>
          <div id="min-btn" class="win-btn no-drag" title="最小化" @click="winHandle('min')">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24">
              <path
                d="M24 17.57v2.57c0 1.18-.96 2.15-2.14 2.15H2.14A2.15 2.15 0 0 1 0 20.14v-2.57c0-1.18.96-2.14 2.14-2.14h19.72c1.18 0 2.14.96 2.14 2.14z"
              />
            </svg>
          </div>
          <div id="max-btn" class="win-btn no-drag" title="最大化" @click="winHandle('max')">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24">
              <path
                d="M3.43 18.86h17.14V8.57H3.43v10.29zM24 3.86v16.28c0 1.18-.96 2.15-2.14 2.15H2.14A2.15 2.15 0 0 1 0 20.14V3.86C0 2.68.96 1.7 2.14 1.7h19.72c1.18 0 2.14.97 2.14 2.15z"
              />
            </svg>
          </div>
          <div id="close-btn" class="win-btn icon-close no-drag" title="关闭" @click="winHandle('close')">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="24" viewBox="0 0 19 24">
              <path
                d="M17.38 17.7c0 .34-.13.67-.37.92l-1.82 1.82a1.3 1.3 0 0 1-1.82 0L9.43 16.5l-3.94 3.94a1.3 1.3 0 0 1-1.82 0l-1.82-1.82a1.3 1.3 0 0 1 0-1.83l3.94-3.93-3.94-3.94a1.3 1.3 0 0 1 0-1.82l1.82-1.83a1.3 1.3 0 0 1 1.82 0l3.94 3.94 3.94-3.94a1.3 1.3 0 0 1 1.82 0L17 7.1a1.3 1.3 0 0 1 0 1.82l-3.94 3.94 3.94 3.93c.24.24.37.58.37.91z"
              />
            </svg>
          </div>
        </div>
      </div>
    </template>
    <template #aside>
      <TreeMenu ref="treeMenu" class="win-menu" :data="treeData" accordion :show-filter="false"></TreeMenu>
    </template>
    <section class="win-content">
      <div>
        Title: <input id="title" />
        <Button id="set-title" type="button">Set</Button>
      </div>
      <div>
        <p>
          Current Locale: <strong id="locale-source">{{ currentLocale }}</strong>
        </p>
        <Button id="toggle-locale" @click="toggleLocale">Toggle Locale</Button>
        <Button id="reset-to-system-locale" @click="systemLocale">Reset to System Locale</Button>
      </div>
      <div>
        <p>
          Current Theme: <strong id="theme-source">{{ currentTheme }}</strong>
        </p>
        <Button id="toggle-theme" @click="toggleTheme">Toggle Dark Mode</Button>
        <Button id="reset-to-system-theme" @click="systemTheme">Reset to System Theme</Button>
      </div>
      <div>
        <Button id="open-file" type="button">Open a File</Button>
        File path: <strong id="filePath"></strong>
      </div>
    </section>
    <template #footer>
      <footer class="win-footer">
        <versions></versions>
        <about></about>
      </footer>
    </template>
  </Container>
</template>

<style lang="less">
@import './assets/css/index.less';
@import './assets/css/styles.less';
</style>
