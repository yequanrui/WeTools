<template>
  <div id="lang-btn" class="win-btn no-drag" :title="$t('switchLang')">
    <drop-down :items="langs" :selected-item="currentLang" @item-click="switchLang">
      <template #toggle>
        <tiny-icon-language></tiny-icon-language>
      </template>
    </drop-down>
  </div>
  <div id="theme-btn" class="win-btn no-drag" :title="$t('changeTheme')">
    <drop-down :items="themes" :selected-item="currentTheme" @item-click="changeTheme">
      <template #toggle>
        <tiny-icon-custom></tiny-icon-custom>
      </template>
    </drop-down>
  </div>
  <div id="min-btn" class="win-btn no-drag" :title="$t('minimize')" @click="winHandle('min')">
    <tiny-icon-panelMini></tiny-icon-panelMini>
  </div>
  <div id="max-btn" class="win-btn no-drag" :title="isMaximized ? $t('unmaximize') : $t('maximize')"
    @click="winHandle('max')">
    <tiny-icon-panelMax v-if="!isMaximized"></tiny-icon-panelMax>
    <tiny-icon-panelNormal v-if="isMaximized"></tiny-icon-panelNormal>
  </div>
  <div id="close-btn" class="win-btn icon-close no-drag" :title="$t('close')" @click="winHandle('close')">
    <tiny-icon-close></tiny-icon-close>
  </div>
</template>

<script setup>
import { IconClose, IconCustom, IconLanguage, IconPanelMax, IconPanelMini, IconPanelNormal } from '@opentiny/vue-icon';
import { getCurrentInstance, ref } from 'vue';

const TinyIconCustom = IconCustom();
const TinyIconLanguage = IconLanguage();
const TinyIconPanelMini = IconPanelMini();
const TinyIconPanelNormal = IconPanelNormal();
const TinyIconPanelMax = IconPanelMax();
const TinyIconClose = IconClose();

//#region 语言切换
const ctx = getCurrentInstance()?.ctx;
const langs = ref([
  { label: 'systemDefault', value: 'system' },
  { label: 'chinese', value: 'zh-CN', divided: true },
  { label: 'english', value: 'en-US' },
]);
let currentLang = ref(langs.value[0]);
/**
 * 切换语言
 * @param {*} lang 语言
 */
async function switchLang(lang) {
  currentLang.value = lang;
  ctx.$i18n.locale = lang.value === 'system' ? 'zhCN' : lang.value.replace('-', ''); // 切换页面语言
  await window.api.switchLang(lang.value); // 切换窗体语言
}
//#endregion

//#region 主题切换
const themes = ref([
  { label: 'systemDefault', value: 'system' },
  { label: 'light', value: 'light', divided: true },
  { label: 'dark', value: 'dark' },
]);
let currentTheme = ref(themes.value[0]);
/**
 * 切换主题
 * @param {*} theme 主题
 */
async function changeTheme(theme) {
  currentTheme.value = theme;
  await window.api.changeTheme(theme.value);
}
//#endregion

//#region 窗口操作
const isMaximized = ref(window.api.isMaximized());
/**
 * 窗口操作
 * @param {*} opera 操作项：min-最小化、max-最大化/恢复、close-关闭
 */
const winHandle = (opera) => {
  opera === 'max' && (isMaximized.value = !window.api.isMaximized());
  window.api[opera]();
};
//#endregion
</script>

<style lang="less" scoped>
.win-btn {
  margin-right: 10px;
  width: 24px;
  height: 24px;
  line-height: 24px;
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
