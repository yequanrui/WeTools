<template>
  <div>{{ $t('welinkThemes') }}</div>
  <DiffEditor :original-value="defaultConfig" :now-value="userConfig" @update:now-value="updateNowValue"></DiffEditor>
  <TinyInput v-model="defaultConfig" disabled></TinyInput>
  <TinyInput v-model="userConfig"></TinyInput>
  <TinyButton class="set-theme" @click="readConfig">读取</TinyButton>
  <TinyButton class="set-theme" @click="writeConfig">设置</TinyButton>
</template>

<script setup>
import { ref } from 'vue';
import TinyButton from '@opentiny/vue-button';
import TinyInput from '@opentiny/vue-input';
import { DiffEditor } from '../components';
import config from '../../../../resources/dev/config.json';

const defaultConfig = ref(JSON.stringify(config, null, 2));
const userConfig = ref('2');

function updateNowValue(e) {
  userConfig.value = e;
}

function readConfig() {}

function writeConfig() {}
</script>

<style lang="less" scoped></style>
