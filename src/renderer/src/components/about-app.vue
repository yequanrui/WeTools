<script setup>
import { ref } from 'vue';
import TinyDropdown from '@opentiny/vue-dropdown';
import TinyDropdownMenu from '@opentiny/vue-dropdown-menu';
import TinyDropdownItem from '@opentiny/vue-dropdown-item';
import { IconInfo } from '@opentiny/vue-icon';

const options = ref([
  { label: 'GitHub', url: 'https://github.com/yequanrui/WeLink-Themes' },
  { label: 'Gitee', url: 'https://gitee.com/yequanrui/WeLink-Themes' },
]);
const tinyIconInfo = IconInfo();

function itemClick(data) {
  window.open(data.itemData.url);
}
</script>

<template>
  <TinyDropdown title="" :suffix-icon="tinyIconInfo" @item-click="itemClick">
    <template #dropdown>
      <TinyDropdownMenu>
        <TinyDropdownItem v-for="(option, i) in options" :key="i" :label="option.label"></TinyDropdownItem>
      </TinyDropdownMenu>
    </template>
  </TinyDropdown>
</template>

<style lang="less" scoped></style>
