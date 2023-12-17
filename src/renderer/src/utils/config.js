const path = require('path');
const fs = require('fs');
const DEFAULT_ENCODING = 'utf-8';
const CONFIG_NAME = 'config.json';
const defaultConfig = (theme) => path.resolve(`./themes/${theme}/assets/js`, CONFIG_NAME);
const userConfig = (theme, name = '') => path.resolve(`./themes/${theme}/assets`, name ? `${theme}.${name}` : '');
/**
 * 读取用户配置，若没有取默认配置克隆一份
 * @param theme 主题名
 * @param encoding 编码，默认utf-8
 */
const readConfig = (theme, encoding = DEFAULT_ENCODING) => {
  let config = {};
  try {
    if (!fs.existsSync(userConfig(theme, CONFIG_NAME))) {
      config = fs.readFileSync(defaultConfig(theme), encoding);
      writeConfig(JSON.parse(config), theme);
    } else {
      config = fs.readFileSync(userConfig(theme, CONFIG_NAME), encoding);
    }
  } catch (err) {
    console.log(err);
  }
  return JSON.parse(config);
};
/**
 * 把新配置写入用户配置文件
 * @param config 当前配置
 * @param theme 主题名
 */
const writeConfig = (config, theme) => {
  if (!config || !theme) {
    return;
  }
  fs.mkdirSync(userConfig(theme), { recursive: true });
  fs.writeFileSync(userConfig(theme, CONFIG_NAME), JSON.stringify(config, null, 2), { flag: 'w' });
};

module.exports = { readConfig, writeConfig };
