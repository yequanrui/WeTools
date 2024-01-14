import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

let isMaximized = false;
ipcRenderer.on('isMaximized', (_, status) => {
  isMaximized = status;
});

// Custom APIs for renderer
const api = {
  appVersion: () => ipcRenderer.invoke('app-version'), // 工具版本
  min: () => ipcRenderer.send('min'), // 最小化窗口
  max: () => ipcRenderer.send('max'), // 最大化窗口
  isMaximized: () => isMaximized, // 是否最大化窗口
  close: () => ipcRenderer.send('close'), // 关闭窗口
  getStoreValue: (key) => ipcRenderer.sendSync('get-store', key), // 获取配置
  setStoreValue: (key, value) => ipcRenderer.send('set-store', key, value), // 设置配置
  switchLang: (i18n) => ipcRenderer.invoke('switch-lang', i18n), // 切换语言（system/zh-CN/en-US）
  changeTheme: (theme) => ipcRenderer.invoke('change-theme', theme), // 切换主题（system/dark/light）
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
}
