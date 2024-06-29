/**
 * 1.上面说过这个服务商provider可以是github、也可以是自建服务
 * 2.自建服务商服务的地址，可以在打包配置文件`electron-builder.json`中配置，但是我这里不推荐
 * 3. 如果服务器更新地址经常变动，json的配置文件要经常修改，就会导致你要返回的执行打包操作，这些都是可以避免的，因此不推荐
 */

// 设置服务器更新地址
autoUpdater.setFeedURL({
  provider: 'generic',
  url: 'http://127.0.0.1:3001/release',
});

/**
 * 通过main进程发送事件给renderer进程，提示更新信息
 * @param action 传递消息的动作
 * @param updateInfo 需要传递的消息对象
 */
function sendUpdateMessage({ action, updateInfo }) {
  mainWindow.webContents.send('updateMessage', { action, updateInfo });
}

/**
 * 当更新出现错误的时候触发
 */
autoUpdater.on('error', (err) => {
  sendUpdateMessage({ action: 'error', updateInfo: err });
});

/**
 * 当开始检查更新的时候触发
 */
autoUpdater.on('checking-for-update', () => {
  sendUpdateMessage({ action: 'checking', updateInfo: null });
});

// 更新下载进度事件
autoUpdater.on('download-progress', (progressObj) => {
  console.log('下载进度百分比>>>', progressObj.percent);
  mainWindow.webContents.send('downloadProgress', progressObj);
});

/**
 * 监听安装包下载完毕的事件
 * event Event
 * releaseNotes String - 新版本更新公告
 * releaseName String - 新的版本号
 * releaseDate Date - 新版本发布的日期
 * updateUrl String - 更新地址
 */
autoUpdater.on('update-downloaded', (info) => {
  // 下载太快可能无法触发downloadProgress事件，所以手动通知一下
  mainWindow.webContents.send('downloadProgress', { percent: 100 });
  // 可以手动选择是否立即退出并更新
  ipcMain.on('isUpdateNow', (e, arg) => {
    autoUpdater.quitAndInstall();
  });
});

/**
 * 执行自动更新检查
 */
ipcMain.on('checkForUpdate', () => {
  console.log('执行自动更新检查');
  autoUpdater.checkForUpdates();
});

/**
 * 手动下载
 */
ipcMain.on('downloadUpdate', () => {
  autoUpdater.downloadUpdate();
});
