// app负责着您应用程序的事件生命周期
// BrowserWindow负责创建和管理应用窗口
import { app, ipcMain, nativeImage, nativeTheme, shell, BrowserWindow, Menu, Notification, Tray } from 'electron';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { join, resolve } from 'path';
import { execFile, execSync } from 'child_process';
import Store from 'electron-store';
import i18n from '../../resources/i18n.json';
import icon from '../../resources/icon.png?asset';

const protocolName = app.getName(); // 协议名
let locale = 'system'; // 国际化键值，默认为system，即使用当前系统语言
let mainWin; // 存储主窗口实例
let mainWinId; // 用于标记主窗口Id
let tray; // 托盘实例
// 注册应用的协议处理器
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient(protocolName, process.execPath, [resolve(process.argv[1])]);
  }
} else {
  app.setAsDefaultProtocolClient(protocolName);
}
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // 当尝试运行第二个实例时让焦点指向当前实例窗口
    if (mainWin) {
      mainWin.isMinimized() && mainWin.restore();
      mainWin.show();
      mainWin.focus();
    }
  });
  // 开机是否自启动，注意非开发环境
  if (process.env.NODE_ENV === 'production') {
    const settings = {
      openAtLogin: true, // 是否开机启动
      openAsHidden: true, // 是否隐藏主窗体，保留托盘位置
    };
    if (process.platform !== 'darwin') {
      settings.path = process.execPath;
      settings.args = ['--processStart', `"${process.execPath}"`, '--process-start-args', `"--hidden"`];
    }
    app.setLoginItemSettings(settings);
  }
  // 创建主窗口

  app
    .whenReady()
    .then(() => {
      locale === 'system' && (locale = app.getSystemLocale());
      // 对于Windows上的通知，需要设置一个AppUserModelID
      electronApp.setAppUserModelId(app.getName());
      // 创建托盘及其右键菜单
      tray = new Tray(nativeImage.createFromPath(icon));
      tray.setTitle(app.getName());
      tray.setToolTip(app.getName());
      tray.on('right-click', () => {
        const contextMenu = Menu.buildFromTemplate([
          { label: i18n[locale].light, submenu: [{ label: i18n[locale].default }] },
          { label: i18n[locale].dark, submenu: [{ label: i18n[locale].default }] },
          { type: 'separator' },
          {
            label: i18n[locale].restartWeLink,
            click: () => {
              try {
                execSync('taskkill/F /Im "WeLink.exe"');
              } catch (error) {
                /* empty */
              } finally {
                execFile('C:/Program Files (x86)/WeLink/WeLink.exe');
              }
            },
          },
          {
            label: i18n[locale].restartApp,
            click: () => {
              app.relaunch();
              app.quit();
            },
          },
          { label: i18n[locale].quit, role: 'quit' },
        ]);
        tray.popUpContextMenu(contextMenu);
      });
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
    })
    .then(showNotification);
}
function createWindow() {
  // Create the browser window.
  mainWin = new BrowserWindow({
    icon,
    width: 800,
    height: 600,
    show: false, // 窗口是否创建后就显示
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
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });
  !mainWinId && (mainWinId = mainWin.id); // 记录下主窗口Id
  mainWin.setTitle(app.getName()); // 设置窗口标题
  mainWin.on('ready-to-show', () => mainWin.show());
  // 将预加载脚本附加到webview
  mainWin.webContents.on('will-attach-webview', (e, webPreferences) => {
    webPreferences.preload = join(__dirname, '../preload/index.js');
  });
  mainWin.webContents.setWindowOpenHandler(({ url }) => {
    setImmediate(() => shell.openExternal(url));
    return { action: 'deny' };
  });
  // 在渲染器中使用模块热替换（HMR）功能，需要使用环境变量来确定窗口浏览器是加载本地html文件还是本地URL
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWin.loadURL(process.env['ELECTRON_RENDERER_URL']);
    mainWin.webContents.openDevTools(); // 打开开发者工具
  } else {
    mainWin.loadFile(join(__dirname, '../renderer/index.html'));
  }
  // 监听主窗口是否最大化
  mainWin.on('maximize', () => mainWin.webContents.send('isMaximized', true));
  mainWin.on('unmaximize', () => mainWin.webContents.send('isMaximized', false));
  // 页面准备好才显示窗口
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
function showNotification(body = 'Start successfully.', title = 'Info') {
  new Notification({ icon, body, title }).show();
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
  return win.isMaximized();
});
ipcMain.on('close', (e) => BrowserWindow.fromWebContents(e.sender).close());
// 监听页面切换语言事件，同时刷新窗口的语言
ipcMain.handle('switch-lang', (_, lang) => (locale = lang === 'system' ? app.getSystemLocale() : lang));
// 使用nativeTheme切换主题
ipcMain.handle('change-theme', (_, theme) => (nativeTheme.themeSource = theme));
// 禁用GPU渲染
app.disableHardwareAcceleration();
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
// 因为阻止了close事件，导致关机时无法关闭主窗口，故加此行
app.on('before-quit', () => mainWin.destroy());
