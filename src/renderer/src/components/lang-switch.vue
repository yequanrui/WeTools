<script setup>
import { getCurrentInstance } from 'vue';

const ctx = getCurrentInstance()?.ctx;
const changeLang = () => {
  ctx.$i18n.locale = ctx.$i18n.locale === 'zhCN' ? 'enUS' : 'zhCN';
};
</script>

<template>
  <tiny-tooltip :content="i18nByKey('changeLang')" placement="left">
    <span class="lang-btn" @click="changeLang">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M16.36 14.02h3.37q.29-1.32.29-2.02t-.29-2.02h-3.37q.14.99.14 2.02t-.14 2.02zm-1.78 5.53q1.17-.38 2.44-1.43t1.92-2.14h-2.96q-.46 1.88-1.4 3.57zm-.24-5.53q.14-.99.14-2.02t-.14-2.02H9.66q-.15.99-.15 2.02t.15 2.02h4.68zM12 19.97q1.31-1.92 1.92-3.98h-3.84q.6 2.06 1.92 3.98zM8.02 8.02Q8.58 6 9.42 4.45q-1.17.38-2.46 1.43t-1.9 2.14h2.96zm-2.96 7.96q.61 1.08 1.9 2.14t2.46 1.43q-.94-1.7-1.4-3.57H5.06zm-.8-1.96h3.38Q7.5 13.03 7.5 12t.14-2.02H4.27Q3.99 11.3 3.99 12t.28 2.02zM12 4.03q-1.31 1.92-1.92 3.99h3.84q-.6-2.07-1.92-3.99zm6.94 3.99q-.66-1.08-1.92-2.14t-2.44-1.43q.84 1.55 1.4 3.57h2.96zm-6.94-6q4.13 0 7.05 2.93T21.98 12t-2.93 7.06T12 21.99t-7.05-2.93T2 12t2.94-7.05T12 2.02z"
        />
      </svg>
    </span>
  </tiny-tooltip>
</template>
