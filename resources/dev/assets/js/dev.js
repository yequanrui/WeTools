// region 公共参数
const DEFAULT_LANGUAGE_CODE = '2052';
const devList = [];
const STORAGE_LIST = {
  videoBgPath: 'videoBgPath',
};
const LANGUAGE_MAP = {
  2052: {
    'custom-bg': '自定义背景',
    'close-bg': '关闭背景',
    'more-bg': '更多背景',
  },
  1028: {
    'custom-bg': 'Custom Background',
    'close-bg': 'Close Background',
    'more-bg': 'More Background',
  },
};
// endregion
// region 公共方法
// 阻止事件冒泡
const stopProp = (e) => (e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true));
// 给head对象添加元素
const appendToHead = (element) => {
  if (!element) return;
  let head = document.getElementsByTagName('head')[0];
  !head && (head = document.createElement('head'));
  head.appendChild(element);
};
// 加载脚本文件
const addScript = (url, onload, onerror) => {
  if (!url) return;
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  onload && (script.onload = onload);
  onerror && (script.onerror = onerror);
  appendToHead(script);
};
// 加载样式文件
const addStyle = (url) => {
  if (!url) return;
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  appendToHead(link);
};
// 添加/删除类
const toggleClass = (target, cls, toggle = false) => {
  const targetEl = document.querySelector(target);
  if (targetEl) {
    toggle ? targetEl.classList.add(cls) : targetEl.classList.remove(cls);
  }
};
// 触发键盘事件
const keyEvent = (key, ctrlKey = false, altKey = false, shiftKey = false) => {
  const ke = new KeyboardEvent('keydown', { ctrlKey, altKey, shiftKey, detail: 1, view: window });
  // key是键盘对应键的code值
  Object.defineProperty(ke, 'key', { value: key });
  document.dispatchEvent(ke);
};
// 通过浏览器协议打开工具
const openProtocol = (protocolName) => {
  const winFeatures = [
    'left=0', // 新窗口距离屏幕左侧的像素数
    'top=-50', // 新窗口距离屏幕上侧的像素数
    'width=0', // 新窗口的宽度
    'height=0', // 新窗口的高度
    'innerWidth=0', // 新窗口的内部宽度
    'innerHeight=0', // 新窗口的内部高度
    'outerWidth=0', // 新窗口的外部宽度
    'outerHeight=0', // 新窗口的外部高度
    'centerscreen=no', // 是否在屏幕中央打开
    'fullscreen=no', // 是否全屏
    'titlebar=no', // 是否显示标题栏
    'toolbar=no', // 是否显示工具栏
    'menubar=no', // 是否显示菜单栏
    'location=no', // 是否显示地址栏
    'status=no', // 是否显示是否显示状态栏
    'scrollbars=no', // 是否显示滚动条
    'resizable=no', // 窗口是否可调整大小
    'directories=no', // 是否显示目录栏
    'help=no', // 是否显示帮助按钮
    'minmizebutton=no', // 是否显示最小化按钮
    'maxmizebutton=no', // 是否显示最大化按钮
  ];
  window.open(`${protocolName}://`, protocolName, winFeatures.join(',')).close();
};
// 从localStorage获取值（值是整型或布尔型），没有或异常时取默认值
const getLocalByDefault = (key, defaultValue) => {
  let value = localStorage.getItem(key);
  try {
    value = value ? JSON.parse(value) : defaultValue;
  } catch (e) {
    value = defaultValue;
  }
  return value;
};
// endregion
// region 调用WeLink/Node自带方法，实际执行会报它不是方法，但方法实际有效，try catch一下使代码继续执行
/**
 * 调用require函数获取文件数据
 * @param path 文件路径
 * @returns {*}
 */
const getData = (path) => {
  let res;
  try {
    res = window.require(path);
  } catch (e) {}
  return res;
};
/**
 * 内部请求函数
 * @param method 请求方法
 * @param url 请求地址
 * @param header 请求头部
 * @param body 请求体
 * @returns {Promise<{}>}
 */
const rsHttp = async ({ method, url, header, body }) => {
  let res;
  try {
    res = await window.coreRsHttp[method]({ request: { url, header, body } });
  } catch (e) {}
  return res || {};
};
/**
 * 判断是否开发者IP
 * @returns {boolean}
 */
const isDev = () => {
  let flag = false;
  try {
    const os = require('os');
    const network = os.networkInterfaces();
    const localhost = network[Object.keys(network)[0]][0].address;
    flag = devList.includes(btoa(localhost));
  } catch (e) {}
  return flag;
};
/**
 * 获取当前语言代号
 * @returns {string}
 */
const getLangCode = () => {
  let lang = DEFAULT_LANGUAGE_CODE;
  try {
    lang = window.getLanguageCode();
  } catch (e) {}
  return lang;
};
/**
 * 加载中特效
 * @param show 是否显示
 * @returns {*}
 */
const wtLoading = (show) => window.Pedestal.callMethod(`method://pedestal/${show ? 'showLoading' : 'closeLoading'}`);
/**
 * 打开链接
 * @param url 链接地址
 * @returns {*}
 */
const wtOpenUrl = (url) => window.Pedestal.callMethod('method://pedestal/openUrl', url);
/**
 * 全局提示
 * @param content 提示内容
 * @returns {*}
 */
const wtToast = (content) => window.Pedestal.callMethod('method://pedestal/toast', { content });
/**
 * 警示提示框
 * @param content 提示内容
 * @returns {*}
 */
const wtAlert = (content) => window.Pedestal.callMethod('method://pedestal/alert', { dialogId: Date.now(), content });
/**
 * 确认提示框
 * @param content 提示内容
 * @returns {*}
 */
const wtConfirm = (content) => window.Pedestal.callMethod('method://pedestal/confirm', { dialogId: Date.now(), content });
/**
 * 消息提示框，可带输入框
 * @param title 弹框标题
 * @param inputType 输入框类型
 * @param inputTestId 输入框data-testid属性的值，用于寻找该元素
 * @param placeholders 输入框占位符
 * @param defaultValue 输入框默认值
 * @param maxLength 输入框最大长度，默认1e5，即100000
 * @param callback 单击弹框确定按钮时的回调函数
 * @returns {Promise<void>}
 */
const wtNotifyPrompt = async ({ title, inputType = 'text', inputTestId, placeholders, defaultValue, maxLength = 1e5, callback }) => {
  const newProc = new Promise((resolve) => {
    const d = window.Pedestal.callMethod('method://pedestal/notifyPrompt', {
      dialogId: Date.now(),
      title,
      inputParam: { inputType, placeholders, inputTestId, maxLength, defaultValue },
    });
    setTimeout(() => {
      if (inputTestId) {
        const input = document.querySelector(`input[data-testid="${inputTestId}"]`);
        if (input) {
          input.value = defaultValue;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
      resolve(d);
    });
  });
  newProc.then((d) => {
    if (d.ret) {
      const value = d.param[`input_type_${inputType}`];
      callback && callback(value);
    }
  });
};
/**
 * 移动窗口到某坐标
 * @param x 横坐标
 * @param y 纵坐标
 */
const move = (x, y) => {
  try {
    window.moveTo(x, y);
  } catch (e) {}
};
/**
 * 重置窗口大小
 * @param x 宽度
 * @param y 高度
 */
const resize = (x, y) => {
  try {
    window.resizeTo(x, y);
  } catch (e) {}
};
/**
 * 调用Electron内部函数跳转外部链接（仅pedestal可用）
 * @param url 跳转链接
 */
const openExternal = (url) => {
  try {
    electron.shell.openExternal(url);
  } catch (e) {}
};
// endregion
// region 特性方法
// 生成资源默认路径
const basePath = (index, path = 'assets/', padPath = '../') => path.padStart(index * padPath.length + path.length, padPath);
// 生成样式表路径
const stylePath = (index, viewID) => `${basePath(index)}css/${viewID}.css`;
// 视频背景列表
let videoList = [];
// 获取视频显示名
const setVideoName = (langCode, video) => {
  video.name = langCode === DEFAULT_LANGUAGE_CODE ? video.cnName : video.enName;
  !video.name && (video.name = video.fileName);
};
// 初始化视频背景列表
const initVideoList = (langCode = DEFAULT_LANGUAGE_CODE) => {
  const videoBgPath = localStorage.getItem(STORAGE_LIST.videoBgPath);
  videoList = getData(videoBgPath) || [];
  if (videoList.length) {
    for (let i = 0; i < videoList.length; i++) {
      const vb = videoList[i];
      setVideoName(langCode, vb);
      if (!vb.children) {
        continue;
      }
      for (let j = 0; j < vb.children.length; j++) {
        const child = vb.children[j];
        setVideoName(langCode, child);
      }
    }
  }
  const subVideoList = [
    { value: 'custom-bg', show: true },
    { value: 'close-bg', show: true },
    { value: 'more-bg', show: true },
  ];
  subVideoList.forEach((sv) => (sv.name = LANGUAGE_MAP[langCode][sv.value]));
  videoList.push(...subVideoList);
};
// endregion
(() => {
  const script = document.currentScript || document.scripts[document.scripts.length - 1];
  const scriptSrc = script.src;
  const index = scriptSrc.lastIndexOf('../') + 1;
  console.log(`index: ${index}\nname: ${script.dataset.name}`);
})();
