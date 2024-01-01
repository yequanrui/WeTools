<script setup>
import { reactive } from 'vue';

const versions = reactive({ ...window.electron.process.versions });
const initVersions = async () => {
  versions.app = await window.api.appVersion();
};
initVersions();
</script>

<template>
  <ul class="versions">
    <li class="v8-version">App: {{ versions.app }}</li>
    <li class="electron-version">Electron {{ versions.electron }}</li>
    <li class="chrome-version">Chromium {{ versions.chrome }}</li>
    <li class="node-version">Node {{ versions.node }}</li>
  </ul>
</template>

<style lang="less">
.versions {
  float: left;
  clear: both;
  overflow: hidden;
  color: var(--aide-text);
  line-height: 1.5;
  transition: all 0.3s;
  li {
    display: block;
    float: left;
    border-right: 1px solid var(--aide-text);
    font-size: 12px;
    opacity: 0.8;
    &:not(:first-child) {
      padding-left: 12px;
    }
    &:not(:last-child) {
      padding-right: 12px;
    }
    &:last-child {
      border: none;
    }
  }
}
</style>
