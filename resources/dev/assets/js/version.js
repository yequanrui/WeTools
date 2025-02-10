const VERSION = {
  theme: '4.48.0', // 主题版本
  welink: '7.48.6', // 适配的WeLink版本
  current_welink: () => {
    let version = '';
    try {
      // 从全局参数里获取当前安装的WeLink版本
      version = window.CLIENTCONFIG.ACS_SOFTWAREVERSION_VALUE;
    } catch (e) {}
    return version;
  }, // 当前的WeLink版本
};
