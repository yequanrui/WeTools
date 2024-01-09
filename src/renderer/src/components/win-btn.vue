<script setup>
import { ref } from 'vue';
import { IconCustom, IconLanguage, IconPanelMini, IconPanelMax, IconPanelNormal, IconClose } from '@opentiny/vue-icon';

const TinyIconCustom = IconCustom();
const TinyIconLanguage = IconLanguage();
const TinyIconPanelMini = IconPanelMini();
const TinyIconPanelNormal = IconPanelNormal();
const TinyIconPanelMax = IconPanelMax();
const TinyIconClose = IconClose();
const isMaximized = ref(window.isMaximized);
const winHandle = (opera) => window.api[opera]();
</script>

<template>
  <div id="lang-btn" class="win-btn no-drag" title="切换语言">
    <TinyIconLanguage></TinyIconLanguage>
  </div>
  <div id="theme-btn" class="win-btn no-drag" title="切换主题">
    <TinyIconCustom></TinyIconCustom>
  </div>
  <div id="min-btn" class="win-btn no-drag" title="最小化" @click="winHandle('min')">
    <TinyIconPanelMini></TinyIconPanelMini>
  </div>
  <div id="max-btn" class="win-btn no-drag" :title="isMaximized ? '恢复' : '最大化'" @click="winHandle('max')">
    {{ isMaximized }}
    <TinyIconPanelMax v-if="!isMaximized"></TinyIconPanelMax>
    <TinyIconPanelNormal v-if="isMaximized"></TinyIconPanelNormal>
  </div>
  <div id="close-btn" class="win-btn icon-close no-drag" title="关闭" @click="winHandle('close')">
    <TinyIconClose></TinyIconClose>
  </div>
</template>

<style lang="less"></style>
