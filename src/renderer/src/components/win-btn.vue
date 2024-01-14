<script setup>
import { ref } from 'vue';
import { IconCustom, IconLanguage, IconPanelMini, IconPanelMax, IconPanelNormal, IconClose } from '@opentiny/vue-icon';
import DropDown from './drop-down.vue';

const TinyIconCustom = IconCustom();
const TinyIconLanguage = IconLanguage();
const TinyIconPanelMini = IconPanelMini();
const TinyIconPanelNormal = IconPanelNormal();
const TinyIconPanelMax = IconPanelMax();
const TinyIconClose = IconClose();

const langs = ref([
  { label: '系统默认', value: 'system' },
  { label: '简体中文', value: 'zh-CN', divided: true },
  { label: 'English', value: 'en-US' },
]);
let currentLang = langs.value[0];
/**
 * 切换语言
 * @param {*} lang 语言
 */
async function switchLang(lang) {
  currentLang = lang;
  await window.api.toggleLocale(lang.value);
}

const themes = ref([
  { label: '系统默认', value: 'system' },
  { label: '浅色', value: 'light', divided: true },
  { label: '深色', value: 'dark' },
]);
let currentTheme = themes.value[0];
/**
 * 切换主题
 * @param {*} theme 主题
 */
async function changeTheme(theme) {
  currentTheme = theme;
  await window.api.changeTheme(theme.value);
}

const isMaximized = ref(window.api.isMaximized());
/**
 * 窗口操作
 * @param {*} opera 操作项：min-最小化、max-最大化/恢复、close-关闭
 */
const winHandle = (opera) => {
  opera === 'max' && (isMaximized.value = !window.api.isMaximized());
  window.api[opera]();
};
</script>

<template>
  <div id="lang-btn" class="win-btn no-drag" title="切换语言">
    <DropDown :items="langs" :selected-item="currentLang" @item-click="switchLang">
      <template #toggle>
        <TinyIconLanguage></TinyIconLanguage>
      </template>
    </DropDown>
  </div>
  <div id="theme-btn" class="win-btn no-drag" title="切换主题">
    <DropDown :items="themes" :selected-item="currentTheme" @item-click="changeTheme">
      <template #toggle>
        <TinyIconCustom></TinyIconCustom>
      </template>
    </DropDown>
  </div>
  <div id="min-btn" class="win-btn no-drag" title="最小化" @click="winHandle('min')">
    <TinyIconPanelMini></TinyIconPanelMini>
  </div>
  <div id="max-btn" class="win-btn no-drag" :title="isMaximized ? '恢复' : '最大化'" @click="winHandle('max')">
    <TinyIconPanelMax v-if="!isMaximized"></TinyIconPanelMax>
    <TinyIconPanelNormal v-if="isMaximized"></TinyIconPanelNormal>
  </div>
  <div id="close-btn" class="win-btn icon-close no-drag" title="关闭" @click="winHandle('close')">
    <TinyIconClose></TinyIconClose>
  </div>
</template>

<style lang="less" scoped>
.win-btn {
  margin-right: 10px;
  width: 24px;
  height: 24px;
  border-radius: var(--common-border-radius);
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
  svg {
    vertical-align: -2px;
    fill: var(--body-text);
  }
  &:hover {
    box-shadow: var(--base-shadow);
  }
  &#min-btn:hover,
  &#max-btn:hover {
    background-color: var(--highlight-overlay);
  }
  &#close-btn:hover {
    background-color: var(--contrast-bg);
    svg {
      fill: var(--light-text);
    }
  }
}
</style>
