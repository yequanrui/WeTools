<template>
  <div id="about-btn" :title="$t('about')">
    <drop-down :items="links" @item-click="itemClick">
      <template #toggle>
        <tiny-icon-info></tiny-icon-info>
      </template>
    </drop-down>
  </div>
  <tiny-dialog-box v-model:visible="needUpdate" :title="$t('updateTip')" width="300px">
    <span>{{ $t('newVersionTip') }}</span>
    <template #footer>
      <tiny-button type="primary" @click="needUpdate = false">{{ $t('updateNow') }}</tiny-button>
      <tiny-button @click="needUpdate = false">{{ $t('nextTime') }}</tiny-button>
    </template>
  </tiny-dialog-box>
</template>

<script setup>
import { IconInfo } from '@opentiny/vue-icon';
import { ref } from 'vue';

const links = ref([
  { label: 'github', value: 'https://github.com/yequanrui/WeTools' },
  { label: 'gitee', value: 'https://gitee.com/yequanrui/WeTools' },
  { label: 'gitcode', value: 'https://gitcode.com/yequanrui/WeTools' },
  { label: 'checkUpdate', value: 'checkUpdate' },
]);
const TinyIconInfo = IconInfo();
const needUpdate = ref(false);

// 监听主线程返回的更新的信息
// window.ipcRenderer.on('updateMessage', ({ action, updateInfo }) => {
//   console.log(action, updateInfo)
//   switch (action) {
//     case 'updateAva': {
//       state.isShow = true;
//       break;
//     }
//     case 'error': {
//       ElNotification({
//         title: '温馨提示',
//         type: 'error',
//         duration: 10000,
//         offset: 20,
//         message: `更新失败,报错原因：${updateInfo}`,
//         position: 'top-right'
//       })
//       break;
//     }
//     case 'updateNotAva': {
//       // 没有更新信息
//     }
//   }
// });

// 监听下载应用的进度
// window.ipcRenderer.on('downloadProgress', ({ percent }) => {
//   state.content = `正在下载中...进度：${percent}%`
//   if (percent === 100) {
//     window.ipcRenderer.send('isUpdateNow')
//   }
// });

function itemClick(item) {
  if (item.label === 'checkUpdate') {
    checkForUpdate();
    return;
  }
  window.open(item.value);
}

/**
 * 手动检查版本更新
 */
function checkForUpdate() {
  window.ipcRenderer.send('checkForUpdate');
  state.isShow && confirmUpdate();
}

/**
 * 是否要更新版本
 */
function confirmUpdate() {
  window.ipcRenderer.send('downloadUpdate');
}
</script>

<style lang="less" scoped>
#about-btn {
  padding: 1px;
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
