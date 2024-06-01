<template>
  <tiny-tabs v-model="activeName" tab-style="border-card">
    <tiny-tab-item title="表单配置" lazy name="form"></tiny-tab-item>
    <tiny-tab-item title="代码配置" lazy name="json">
      <diff-editor :original-value="defaultConfig" :now-value="userConfig"
        @update:now-value="updateNowValue"></diff-editor>
    </tiny-tab-item>
  </tiny-tabs>

  <TinyInput v-model="defaultConfig" disabled></TinyInput>
  <TinyInput v-model="userConfig"></TinyInput>
  <TinyButton class="set-theme" @click="readConfig">读取</TinyButton>
  <TinyButton class="set-theme" @click="writeConfig">设置</TinyButton>
</template>

<script setup>
import { ref } from 'vue';
import TinyButton from '@opentiny/vue-button';
import TinyInput from '@opentiny/vue-input';
import TinyTabs from '@opentiny/vue-tabs';
import TinyTabItem from '@opentiny/vue-tab-item';
import { DiffEditor } from '../components';
import config from '../../../../resources/dev/assets/config.json';

const activeName = ref('json');
const defaultConfig = ref(JSON.stringify(config, null, 2));
const userConfig = ref('{}');

function updateNowValue(e) {
  userConfig.value = e;
}

function readConfig() { }

function writeConfig() { }
</script>

<style lang="less" scoped></style>
