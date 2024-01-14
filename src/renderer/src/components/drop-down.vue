<template>
  <Dropdown :show-icon="!$slots.toggle" :trigger="trigger" @item-click="itemClick">
    <TinyIconLanguage></TinyIconLanguage>
    <slot v-if="$slots.toggle" name="toggle"></slot>
    <template #dropdown>
      <DropdownMenu>
        <DropdownItem
          v-for="(item, i) in items"
          :key="i"
          :label="item.label"
          :disabled="item.disabled"
          :divided="item.divided"
          :class="{ selected: item.value === selectedItem.value }"
        ></DropdownItem>
      </DropdownMenu>
    </template>
  </Dropdown>
</template>

<script setup>
import Dropdown from '@opentiny/vue-dropdown';
import DropdownMenu from '@opentiny/vue-dropdown-menu';
import DropdownItem from '@opentiny/vue-dropdown-item';
defineProps({
  items: {
    type: Array, // 类型约定
    required: true, // 是否必传
    default: () => [], // 默认值，不传的时候触发，传空字符也不会触发
  },
  selectedItem: {
    type: Object,
    required: false,
    default: () => {},
  },
  trigger: {
    type: String,
    required: false,
    default: 'hover',
  },
});

const itemClick = defineEmits(['itemClick']);
</script>

<style lang="less">
.tiny-dropdown .tiny-dropdown__trigger {
  .tiny-dropdown__title {
    margin-right: 0;
  }
  .tiny-svg {
    fill: var(--body-text);
    font-size: 16px;
  }
  &:not(.tiny-dropdown__caret-button):not(.is-disabled):hover .tiny-svg {
    fill: var(--body-text);
  }
}
.tiny-dropdown-item.selected {
  background-color: var(--ti-dropdown-item-hover-bg-color);
  color: var(--ti-dropdown-item-hover-text-color);
  border-radius: var(--ti-dropdown-item-border-radius);
}
</style>
