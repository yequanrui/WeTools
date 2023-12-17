import { reactive, computed, watchEffect } from 'vue';
import { useAutoStore } from './storage';
import { ZH_CN_LANG, EN_US_LANG, LANG_KEY, LANG_PATH_MAP } from '../data/lang';

const zhPath = LANG_PATH_MAP[ZH_CN_LANG];
const enPath = LANG_PATH_MAP[EN_US_LANG];
const appData = reactive({
  lang: useAutoStore('local', LANG_KEY, ZH_CN_LANG),
  theme: useAutoStore('local', '_theme', 'light'),
});
const isZhCn = computed(() => appData.lang === ZH_CN_LANG);
const appFn = {
  toggleLang() {
    let url = location.href;
    if (appData.lang === ZH_CN_LANG) {
      url = location.href.replace(zhPath, enPath);
    } else {
      url = location.href.replace(enPath, zhPath);
    }
    appData.lang = appData.lang === ZH_CN_LANG ? EN_US_LANG : ZH_CN_LANG;
    // router.push(url)
    location.replace(url);
  },
  toggleTheme() {
    appData.theme = appData.theme === 'light' ? 'dark' : 'light';
  },
};
// 减少页面处理
watchEffect(() => {
  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add('theme-' + appData.theme);
});
export { appData, appFn, isZhCn };
