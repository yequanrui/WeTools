// app负责着您应用程序的事件生命周期
// BrowserWindow负责创建和管理应用窗口
const { app, BrowserWindow, Menu, MenuItem, Notification, Tray, dialog, ipcMain, nativeImage, nativeTheme } = require('electron');
const path = require('node:path');
// 处理文件打开
async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({});
  if (!canceled) {
    return filePaths[0];
  }
}
// 显示桌面通知
function showNotification(body = 'Start successfully.', title = app.getName()) {
  new Notification({ title, body }).show();
}
// 创建浏览器窗口
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: undefined,
    resizable: false, // 是否可以改变大小
    frame: false, // 无边框窗口
    titleBarStyle: 'hidden', // 隐藏标题栏和全尺寸内容窗口
    // titleBarOverlay: true,
    transparent: true, // 窗体是否透明
    backgroundColor: '#00000000', // 窗体背景色
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // 预加载程序
    },
  });
  win.setTitle(app.getName());
  // 加载页面文件
  win.loadFile(path.join(__dirname, 'index.html'));
  const menus = new Menu();
  menus.append(
    new MenuItem({
      label: app.getName(),
      submenu: [
        {
          label: 'Increment',
          accelerator: 'CmdOrCtrl+Shift++',
          click: () => win.webContents.send('update-counter', 1),
        },
        {
          label: 'Decrement',
          accelerator: 'CmdOrCtrl+Shift+-',
          click: () => win.webContents.send('update-counter', -1),
        },
        {
          role: 'reload',
          accelerator: 'CmdOrCtrl+R',
        },
        {
          role: 'forceReload',
          accelerator: 'CmdOrCtrl+Shift+R',
        },
        {
          role: 'toggleDevTools',
          accelerator: 'F12',
        },
      ],
    })
  );
  Menu.setApplicationMenu(menus);
  // 打开开发者工具
  // win.webContents.openDevTools();
}
// 从nativeTheme中获取主题颜色，使用IPC通道提供主题切换和重置控制
ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light';
  } else {
    nativeTheme.themeSource = 'dark';
  }
  return nativeTheme.shouldUseDarkColors;
});
ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system';
});
let tray;
// 在app模块的ready事件被激发后才能创建浏览器窗口
app
  .whenReady()
  .then(() => {
    // 创建托盘及其右键菜单
    const icon = nativeImage.createFromPath(path.join(__dirname, 'assets/favicon.ico'));
    tray = new Tray(icon);
    tray.setTitle(app.getName());
    tray.setToolTip(app.getName());
    const contextMenu = Menu.buildFromTemplate([
      { label: '浅色', type: 'radio' },
      { label: '深色', type: 'radio' },
    ]);
    tray.setContextMenu(contextMenu);
    // ipcMain监听处理事件
    ipcMain.handle('app-version', () => app.getVersion());
    ipcMain.handle('dialog:openFile', handleFileOpen);
    ipcMain.on('set-title', (event, title) => {
      const webContents = event.sender;
      const win = BrowserWindow.fromWebContents(webContents);
      win.setTitle(title);
    });
    ipcMain.on('counter-value', (_event, value) => {
      console.log(value);
    });
    createWindow();
    // 如果没有窗口打开则打开一个窗口(macOS)
    app.on('activate', () => {
      BrowserWindow.getAllWindows().length === 0 && createWindow();
    });
  })
  .then(showNotification);
// 关闭所有窗口时退出应用(Windows&Linux)
app.on('window-all-closed', () => {
  // win32(Windows)、linux(Linux)、darwin(macOS)
  process.platform !== 'darwin' && app.quit();
});
