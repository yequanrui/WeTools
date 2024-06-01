<template>
  <tiny-collapse v-model="activeNames">
    <tiny-collapse-item :title="$t('generalSettings')" name="Common">
      <tiny-form label-width="120px">
        <tiny-form-item :label="$t('openAtLogin')">
          <tiny-switch v-model="enableLogin" show-text @change="enableLoginChange"></tiny-switch>
        </tiny-form-item>
      </tiny-form>
    </tiny-collapse-item>
    <tiny-collapse-item :title="$t('welinkSettings')" name="WeLink">
      <tiny-form overflow-title label-width="120px">
        <tiny-form-item :label="$t('welinkDir')">
          <tiny-input v-model="welinkDir" spellcheck="false">
            <template #suffix>
              <tiny-button class="folder-icon" type="text" :icon="TinyIconFolderOpened" :title="$t('selectWeLinkDir')"
                @click="openDirDialog"></tiny-button>
            </template>
          </tiny-input>
        </tiny-form-item>
        <tiny-form-item :label="$t('themeDir')">
          <tiny-input v-model="themeDir" disabled></tiny-input>
        </tiny-form-item>
      </tiny-form>
    </tiny-collapse-item>
  </tiny-collapse>
</template>

<script setup>
import { ref, watch } from 'vue';
import { t } from '@opentiny/vue-locale';
import TinyButton from '@opentiny/vue-button';
import TinyCollapse from '@opentiny/vue-collapse';
import TinyCollapseItem from '@opentiny/vue-collapse-item';
import TinyForm from '@opentiny/vue-form';
import TinyFormItem from '@opentiny/vue-form-item';
import TinyInput from '@opentiny/vue-input';
import TinySwitch from '@opentiny/vue-switch';
import { IconFolderOpened } from '@opentiny/vue-icon';
import { openDialog } from '../utils';

const TinyIconFolderOpened = IconFolderOpened();
const activeNames = ref(['Common', 'WeLink']);
const enableLogin = ref(false);
const welinkDir = ref('');
const themeDir = ref('');

watch(
  welinkDir,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      themeDir.value = `${newValue}\\resources\\app\\assets`;
    }
  },
  { immediate: true }
);
// 初始化配置
const init = async () => {
  enableLogin.value = await window.api.getStoreValue('openAtLogin');
  welinkDir.value = await window.api.getStoreValue('welinkDir');
};
init();

async function enableLoginChange() {
  await window.api.setStoreValue('openAtLogin', enableLogin.value);
  await window.api.toggleLogin(enableLogin.value);
}

async function openDirDialog() {
  const temp = await openDialog({
    title: t('selectWeLinkDir'),
    defaultPath: welinkDir.value,
    properties: ['openDirectory'],
  });
  if (temp) {
    welinkDir.value = temp[0];
    await window.api.setStoreValue('welinkDir', welinkDir.value);
  }
}
</script>

<style lang="less" scoped>
.folder-icon {
  margin-right: -8px;
}
</style>
