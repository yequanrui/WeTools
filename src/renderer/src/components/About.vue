<script setup>
import { ref } from 'vue';
import Dropdown from '@opentiny/vue-dropdown';
import DropdownMenu from '@opentiny/vue-dropdown-menu';
import DropdownItem from '@opentiny/vue-dropdown-item';
import IconInfo from '@opentiny/vue-icon';

const options = ref([
  {
    label: 'GitHub',
    url: 'https://github.com/yequanrui/WeLink-Themes',
  },
  {
    label: 'Gitee',
    url: 'https://gitee.com/yequanrui/WeLink-Themes',
  },
]);

function itemClick(data) {
  window.open(data.itemData.url);
}
</script>

<template>
  <Dropdown title="" :suffix-icon="IconInfo" @item-click="itemClick">
    <template #dropdown>
      <DropdownMenu>
        <DropdownItem v-for="(option, i) in options" :key="i" :label="option.label"></DropdownItem>
      </DropdownMenu>
    </template>
  </Dropdown>
</template>

<style lang="less"></style>
