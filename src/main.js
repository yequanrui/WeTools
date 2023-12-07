// app负责着您应用程序的事件生命周期
// BrowserWindow负责创建和管理应用窗口
const { app, BrowserWindow, Menu, MenuItem, Notification, Tray, dialog, ipcMain, nativeImage, nativeTheme } = require('electron');
const path = require('node:path');
// 当应用更新、卸除的时候，应用会自动退出
if (require('electron-squirrel-startup')) {
  app.quit();
}
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
const icon = nativeImage.createFromPath(path.join(__dirname, '../assets/img/logo.png')); // 程序图标
let mainWin; // 存储主窗口实例
let mainWinId; // 用于标记主窗口Id
// 创建浏览器窗口
function createWindow() {
  mainWin = new BrowserWindow({
    icon,
    width: 800,
    height: 600,
    useContentSize: true,
    resizable: true, // 是否可以改变大小
    minimizable: true, // 是否可以最小化
    maximizable: true, // 是否可以最大化
    autoHideMenuBar: true, // 自动隐藏菜单栏，除非按Alt键
    titleBarStyle: 'hidden', // 隐藏标题栏和全尺寸内容窗口
    titleBarOverlay: false,
    backgroundColor: '#00000000', // 窗口背景色
    opacity: 0.9, // 窗口初始透明度
    hasShadow: true, // 窗口是否有阴影
    show: false, // 窗口是否创建后就显示
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // 预加载程序
    },
  });
  !mainWinId && (mainWinId = mainWin.id); // 记录下主窗口Id
  mainWin.setTitle(app.getName()); // 设置窗口标题
  // 自定义菜单栏
  const menus = new Menu();
  menus.append(
    new MenuItem({
      label: app.getName(),
      submenu: [
        { role: 'reload', accelerator: 'CmdOrCtrl+R' },
        { role: 'forceReload', accelerator: 'CmdOrCtrl+Shift+R' },
        { role: 'toggleDevTools', accelerator: 'F12' },
      ],
    })
  );
  Menu.setApplicationMenu(menus);
  mainWin.loadFile(path.join(__dirname, 'index.html')); // 加载页面文件
  // mainWin.webContents.openDevTools(); // 打开开发者工具
  mainWin.on('ready-to-show', () => mainWin.show());
  mainWin.on('close', (e) => {
    // 如果关闭的是主窗口，阻止并隐藏主窗口
    if (mainWin.id === mainWinId) {
      e.preventDefault();
      mainWin.hide();
    }
  });
  mainWin.on('closed', () => (mainWin = null));
}
// 从nativeTheme中获取主题颜色，使用IPC通道提供主题切换和重置控制
ipcMain.handle('dark-mode:toggle', () => {
  nativeTheme.themeSource = nativeTheme.shouldUseDarkColors ? 'light' : 'dark';
  return nativeTheme.shouldUseDarkColors;
});
ipcMain.handle('dark-mode:system', () => (nativeTheme.themeSource = 'system'));
let tray;
// 在app模块的ready事件被激发后才能创建浏览器窗口
app
  .whenReady()
  .then(() => {
    // 创建托盘及其右键菜单
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
    ipcMain.on('set-title', (event, title) => BrowserWindow.fromWebContents(event.sender).setTitle(title));
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
