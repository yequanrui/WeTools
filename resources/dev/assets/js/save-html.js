(() => {
  // 保存文件
  function saveFile(name, data) {
    const urlObject = window.URL || window.webkitURL || window;
    const blob = new Blob([data]);
    const objectUrl = urlObject.createObjectURL(blob);
    const saveLink = document.createElement('a');
    saveLink.href = objectUrl;
    saveLink.download = name;
    const ev = new MouseEvent('click');
    saveLink.dispatchEvent(ev);
    urlObject.revokeObjectURL(objectUrl);
  }

  // 保存调试用的html文件
  function saveHtml(name = `${Date.now()}.html`) {
    const html = document.getElementsByTagName('html')[0];
    html.classList.add('dev-mode'); // 添加调试模式的className，用于初始化一些样式
    saveFile(name, html.outerHTML);
    html.classList.remove('dev-mode'); // 导出后移除该className
  }

  // 全局注册快捷键
  document.addEventListener('keydown', (e) => e.ctrlKey && e.key === 's' && saveHtml());
})();
