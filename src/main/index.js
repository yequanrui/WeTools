// app负责着您应用程序的事件生命周期
// BrowserWindow负责创建和管理应用窗口
import { app, ipcMain, nativeImage, nativeTheme, shell, BrowserWindow, Menu, Tray } from 'electron';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { join } from 'path';
import Store from 'electron-store';
import icon from '../../resources/icon.png?asset';

let mainWin; // 存储主窗口实例
let mainWinId; // 用于标记主窗口Id
function createWindow() {
  // Create the browser window.
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
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });
  !mainWinId && (mainWinId = mainWin.id); // 记录下主窗口Id
  mainWin.setTitle(app.getName()); // 设置窗口标题
  mainWin.on('ready-to-show', () => mainWin.show());
  mainWin.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWin.loadURL(process.env['ELECTRON_RENDERER_URL']);
    mainWin.webContents.openDevTools(); // 打开开发者工具
  } else {
    mainWin.loadFile(join(__dirname, '../renderer/index.html'));
  }
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
// 初始化存储实例
const option = {
  // C:\Users\{userName}\AppData\Roaming\{projectName}\config.json
  name: 'config', // 文件名称，默认config
  fileExtension: 'json', // 文件后缀，默认json
  cwd: app.getPath('userData'), // 文件位置,尽量不要动，默认情况下，它将通过遵循系统约定来选择最佳位置
  // encryptionKey: 'aes-256-cbc', // 对配置文件进行加密
  clearInvalidConfig: true, // 发生SyntaxError则清空配置
};
const store = new Store(option);
// 获取配置
ipcMain.on('get-store', (_, key) => {
  let value = store.get(key);
  _.returnValue = value || '';
});
// 设置配置
ipcMain.on('set-store', (_, key, value) => store.set(key, value));
store.set('version', app.getVersion());
// 获取app版本
ipcMain.handle('app-version', () => app.getVersion());
// 最小化、最大化、关闭窗口
ipcMain.on('min', (e) => BrowserWindow.fromWebContents(e.sender).minimize());
ipcMain.on('max', (e) => {
  const win = BrowserWindow.fromWebContents(e.sender);
  win.isMaximized() ? win.unmaximize() : win.maximize();
});
ipcMain.on('close', (e) => BrowserWindow.fromWebContents(e.sender).close());
// 从nativeTheme中获取主题颜色，使用IPC通道提供主题切换和重置控制
ipcMain.handle('toggle-theme', () => {
  nativeTheme.themeSource = nativeTheme.shouldUseDarkColors ? 'light' : 'dark';
  return nativeTheme.shouldUseDarkColors;
});
ipcMain.handle('system-theme', () => (nativeTheme.themeSource = 'system'));
let tray;
app.disableHardwareAcceleration();
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');
  // 创建托盘及其右键菜单
  tray = new Tray(nativeImage.createFromPath(icon));
  tray.setTitle(app.getName());
  tray.setToolTip(app.getName());
  const contextMenu = Menu.buildFromTemplate([
    { label: '浅色', type: 'radio' },
    { label: '深色', type: 'radio' },
    { label: '退出', type: 'normal' },
  ]);
  tray.setContextMenu(contextMenu);
  // 单击托盘图标时打开App
  tray.on('click', () => {
    if (mainWin) {
      mainWin.restore();
      mainWin.show();
    }
  });
  // 开发中默认按F12打开或关闭DevTools，在生产中忽略CommandOrControl+R
  app.on('browser-window-created', (_, window) => optimizer.watchWindowShortcuts(window));
  createWindow();
});
// 关闭所有窗口时退出应用(Windows&Linux)
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());

app.on('activate', () => {
  BrowserWindow.getAllWindows().length === 0 && createWindow(); // 如果没有窗口打开则打开一个窗口(macOS)
  // 首次启动应用程序、尝试在应用程序已运行时、单击应用程序的坞站或单击任务栏图标时，重新激活它
  if (mainWin) {
    mainWin.restore();
    mainWin.show();
  }
});
app.on('second-instance', () => {
  // 避免启动多个主窗口
  if (mainWin) {
    mainWin.restore();
    mainWin.show();
  }
});
// 因为阻止了close事件，导致关机时无法关闭主窗口，故加此行
app.on('before-quit', () => mainWin.destroy());
