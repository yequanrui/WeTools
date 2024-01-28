import { createI18n } from 'vue-i18n';
import locale from '@opentiny/vue-locale';
import zhCN from './zh-cn.json';
import enUS from './en-us.json';

export default (i18n) =>
  locale.initI18n({
    i18n,
    createI18n,
    messages: { zhCN, enUS },
  });
