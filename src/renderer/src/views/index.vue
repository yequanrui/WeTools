<template>
  {{ $t('lang') }}
  <div>
    Title: <input id="title" />
    <TinyButton id="set-title" type="button">Set</TinyButton>
  </div>
  <div>
    <TinyButton id="open-file" type="button">Open a File</TinyButton>
    File path: <strong id="filePath"></strong>
  </div>
</template>

<script setup>
import TinyButton from '@opentiny/vue-button';
</script>

<style lang="less" scoped></style>
