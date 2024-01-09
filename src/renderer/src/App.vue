<script setup>
import { ref } from 'vue';
import Button from '@opentiny/vue-button';
import Container from '@opentiny/vue-container';
import TreeMenu from '@opentiny/vue-tree-menu';
import { WinBtn, About, Versions } from './components';

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
          <WinBtn></WinBtn>
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
        <Versions></Versions>
        <About></About>
      </footer>
    </template>
  </Container>
</template>

<style lang="less">
@import './assets/css/index.less';
@import './assets/css/styles.less';
</style>
