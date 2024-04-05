<template>
  <div id="about-btn" :title="$t('about')">
    <drop-down :items="links" @item-click="itemClick">
      <template #toggle>
        <tiny-icon-info></tiny-icon-info>
      </template>
    </drop-down>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { IconInfo } from '@opentiny/vue-icon';
import DropDown from './drop-down';

const links = ref([
  { label: 'github', value: 'https://github.com/yequanrui/WeTools' },
  { label: 'gitee', value: 'https://gitee.com/yequanrui/WeTools' },
]);
const TinyIconInfo = IconInfo();

function itemClick(item) {
  window.open(item.value);
}
</script>

<style lang="less" scoped>
#about-btn {
  padding: 3px;
  width: 24px;
  height: 24px;
  border-radius: var(--common-border-radius);
  text-align: center;
  transition: background-color 0.3s;
  &:hover {
    box-shadow: var(--base-shadow);
  }
}
</style>
