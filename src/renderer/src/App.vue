<script setup>
import { ref, reactive, watchEffect } from 'vue';
import TinyButton from '@opentiny/vue-button';
import TinyContainer from '@opentiny/vue-container';
import TinyTreeMenu from '@opentiny/vue-tree-menu';
import { WinBtn, About, Versions } from './components';

const treeMenu = ref(null);
const treeData = reactive([
  { id: 'welinkThemes', label: 'welinkThemes' },
  { id: 'appSetting', label: 'appSetting' },
  { id: 'appDocs', label: 'appDocs' },
]);
const stop = watchEffect(() => {
  if (treeMenu.value) {
    treeMenu.value.setCurrentKey(treeData[0].id);
    setTimeout(() => stop());
  }
});
const treeChange = (data) => {
  console.log(data);
  // TODO 导航当前节点变化时切换路由
};
</script>

<template>
  <TinyContainer id="win" :pattern="'legend'" :header-height="48" :aside-width="270" :footer-height="40">
    <template #header>
      <div class="win-header drag no-select">
        <div class="win-left">
          <span class="win-logo">
            <img width="20px" height="20px" src="./assets/img/logo.png" />
          </span>
          <span class="win-title">{{ $t('name') }}</span>
        </div>
        <div class="win-right">
          <WinBtn></WinBtn>
        </div>
      </div>
    </template>
    <template #aside>
      <TinyTreeMenu
        ref="treeMenu"
        class="win-menu"
        accordion
        node-key="id"
        :data="treeData"
        :show-filter="false"
        @current-change="treeChange"
      >
        <template #default="slotScope">
          <div>{{ $t(slotScope.data.label) }}</div>
        </template>
      </TinyTreeMenu>
    </template>
    <section class="win-content">
      {{ $t('lang') }}
      <div>
        Title: <input id="title" />
        <TinyButton id="set-title" type="button">Set</TinyButton>
      </div>
      <div>
        <TinyButton id="open-file" type="button">Open a File</TinyButton>
        File path: <strong id="filePath"></strong>
      </div>
    </section>
    <template #footer>
      <footer class="win-footer">
        <Versions></Versions>
        <About></About>
      </footer>
    </template>
  </TinyContainer>
</template>

<style lang="less">
@import './assets/css/styles.less';
#win {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--global-bg);
  border-radius: var(--card-border-radius);
  box-shadow: var(--base-shadow);
  color: var(--body-text);
  .win-header {
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 4px 8px;
    box-shadow: var(--base-shadow);
    .win-left {
      margin-left: 8px;
      height: 32px;
      font-size: 16px;
      line-height: 32px;
      color: var(--body-text);
      .win-logo,
      .win-title {
        display: inline-block;
        vertical-align: top;
      }
      .win-logo {
        margin-top: 4px;
      }
      .win-title {
        margin-left: 8px;
      }
    }
    .win-right {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .win-menu {
    display: contents;
    .tiny-tree {
      height: 100%;
    }
  }
  .win-content {
    flex: auto;
    min-height: 0;
  }
  .win-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: -webkit-fill-available;
    padding: 10px 20px;
    color: var(--aide-text);
    font-size: 12px;
    line-height: 1.5;
  }
}
</style>
