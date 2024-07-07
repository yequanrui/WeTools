<template>
  <tiny-dropdown :show-icon="!$slots.toggle" :trigger="trigger" @item-click="itemClick">
    <slot v-if="$slots.toggle" name="toggle"></slot>
    <template #dropdown>
      <tiny-dropdown-menu>
        <tiny-dropdown-item v-for="(item, i) in items" :key="i" :label="$t(item.label)" :disabled="item.disabled"
          :divided="item.divided" :item-data="item"
          :class="{ selected: item.value === selectedItem?.value }"></tiny-dropdown-item>
      </tiny-dropdown-menu>
    </template>
  </tiny-dropdown>
</template>

<script setup>
defineProps({
  items: {
    type: Array, // 类型约定
    required: true, // 是否必传
    default: () => [], // 默认值，不传的时候触发，传空字符也不会触发
  },
  selectedItem: {
    type: Object,
    required: false,
    default: () => { },
  },
  trigger: {
    type: String,
    required: false,
    default: 'hover',
  },
});
const emits = defineEmits(['itemClick']);
const itemClick = (e) => emits('itemClick', e.itemData);
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
