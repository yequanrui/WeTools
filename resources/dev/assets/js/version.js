const VERSION = {
  theme: '4.48.0', // 主题版本
  welink: '7.48.6', // 适配的WeLink版本
  current_welink: () => {
    let version = '';
    try {
      version = window.CLIENTCONFIG.ACS_SOFTWAREVERSION_VALUE;
    } catch (e) {}
    return version;
  },
};
