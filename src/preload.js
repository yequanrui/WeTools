const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title), // 设置窗体标题
  openFile: () => ipcRenderer.invoke('dialog:openFile'), // 打开文件窗口
  handleCounter: (callback) => ipcRenderer.on('update-counter', callback),
});
contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'), // 切换深色/浅色主题
  system: () => ipcRenderer.invoke('dark-mode:system'), // 跟随系统主题
});
contextBridge.exposeInMainWorld('versions', {
  app: () => ipcRenderer.invoke('app-version'), // 工具版本
  chrome: () => process.versions.chrome, // Chrome版本
  electron: () => process.versions.electron, // Electron版本
  node: () => process.versions.node, // Node版本
  // 除函数之外，也可以暴露变量
});
